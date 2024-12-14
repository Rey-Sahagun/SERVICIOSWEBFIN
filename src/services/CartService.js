const facturapi = require('../apis/facturapi');
const CartModel = require('../models/CartModel');
const ProductModel = require('../models/ProductModel');
const UserModel = require('../models/UserModel');
const UserServices = require('./UserService');
const { sendCartEmail } = require('../apis/mailService');
const { createPaymentIntent } = require('../apis/stripeService');
const { generateCartPdf } = require('../utils/createPDF');
const mongoose = require('mongoose');
const bucket = require('../apis/firebaseConfig');
const { sendInvoiceByEmail, downloadInvoiceFiles } = require('../apis/facturapiHelper');
const { sendWhatsAppMessage } = require('../apis/twilioHelper');




function obtenerFechaActual() {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    const fecha = new Date();
    return fecha.toLocaleDateString('es-ES', opciones).replace(',', '');
}


const getAllCarts = async () => {
    return CartModel.find({}).populate('productos.producto').populate('usuario');
}

const getCart = async (cartId) => {
    //console.log("🚀 ~ getCart ~ cartId:", cartId)
    try {
        const cart = await CartModel.findById(cartId)
            .populate('usuario')  
            .populate('productos.producto'); 

        //console.log("🚀 ~ getCart ~ cart:", cart)
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        return cart;
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        throw error;
    }
}

const getInactiveCarts = async () => {
    return CartModel.find({ estatus: 'Inactivo' });
}

// Mutation: crear carrito
const createCart = async (userId) => {
    //console.log("ID del usuario recibido:", userId);

    const user = await UserServices.getUserById(userId);
    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    if (!user.name) {
        throw new Error("El usuario no tiene un nombre");
    }

    const cart = {
        usuario: userId,
        productos: [],
        subtotal: 0,
        iva: 0,
        total: 0,
        estatus: 'Activo',
    };

    const newCart = await CartModel.create(cart);

    // Popula el usuario antes de devolver el carrito
    const populatedCart = await CartModel.findById(newCart._id).populate({
        path: 'usuario',
        select: 'name email',
    });

    //console.log("Carrito populado:", populatedCart); // Para verificar que el carrito está correctamente populado
    return populatedCart;
};

const closeCart = async (cartId) => {
    const cartDB = await CartModel.findById(cartId).populate('productos.producto').populate('usuario');

    if (!cartDB) {
        throw new Error("El carrito no existe");
    }

    cartDB.estatus = "Inactivo";
    cartDB.fechaCierre = new Date();

    try {
        // Asegúrate de que el cliente tenga un FacturAPI ID
        if (!cartDB.usuario.facturapiId) {
            const clienteFacturapi = await facturapi.createClient({
                legal_name: cartDB.usuario.name,
                tax_id: cartDB.usuario.rfc,
                tax_system: '608',
                email: cartDB.usuario.email,
                address: {
                    zip: cartDB.usuario.zip.toString()
                }
            });
            cartDB.usuario.facturapiId = clienteFacturapi.id;
            await cartDB.usuario.save(); // Guarda el cliente con el nuevo FacturAPI ID
        }

        // Asegúrate de que todos los productos tengan un FacturAPI ID
        for (const item of cartDB.productos) {
            if (!item.producto.facturapiId) {
                const facturapiProduct = await facturapi.createProduct({
                    description: item.producto.name,
                    product_key: '50202306', // Código genérico
                    price: item.producto.price
                });
                item.producto.facturapiId = facturapiProduct.id;
                await item.producto.save(); // Guarda el producto con el nuevo FacturAPI ID
            }
        }

        // Crear factura en FacturAPI
        const facturaApiPayload = {
            customer: cartDB.usuario.facturapiId,
            items: cartDB.productos.map(producto => ({
                product: producto.producto.facturapiId,
                quantity: producto.cantidad
            })),
            payment_form: '01', // Forma de pago: Efectivo
            use: 'G01' // Uso del CFDI: General de gastos
        };

        console.log("FacturAPI Payload:", facturaApiPayload);

        const factura = await facturapi.createFactura(facturaApiPayload);

        if (factura && factura.id) {
            cartDB.facturapiId = factura.id;
        
            // Enviar la factura por correo
            await sendInvoiceByEmail(factura.id, cartDB.usuario.email);
        
            // Descargar archivos de la factura
            await downloadInvoiceFiles(factura.id);
        
            // Subir el archivo PDF a Firebase Storage
            const filePath = `/Users/aldo/Downloads/CARRITO/Facturas/factura_${factura.id}.pdf`;
            const destination = `facturas/factura_${factura.id}.pdf`;

            await uploadFileToStorage(filePath, destination);
        }
        
        // Generar el pago
        const paymentIntent = await createPaymentIntent(cartDB.total, cartId, cartDB.usuario._id);

        // Generar el PDF del carrito
        const cartDetails = {
            productos: cartDB.productos,
            subtotal: cartDB.subtotal,
            iva: cartDB.iva,
            total: cartDB.total,
        };

        const publicUrl = await generateCartPdf(cartDB.usuario.email, cartDB.usuario.name, cartDetails);

        // Enviar correo con el carrito
        await sendCartEmail(cartDB.usuario.email, cartDB.usuario.name, cartDetails, publicUrl);

        // Enviar mensaje de WhatsApp fijo
        await sendWhatsAppMessage();

        await cartDB.save(); // Guarda los cambios en el carrito

    } catch (error) {
        console.error("Error en el cierre del carrito:", error);
    }

    return cartDB;
};

const uploadFileToStorage = async (filePath, destination) => {
    try {
        await bucket.upload(filePath, {
            destination: destination,
            public: true,
        });
        console.log(`Archivo subido a Firebase Storage: ${destination}`);
    } catch (error) {
        console.error("Error al subir el archivo a Firebase Storage:", error.message);
        throw error;
    }
};

const addProductToCart = async (cartId, productId, cantidad = 1) => {
    const cartDB = await CartModel.findById(cartId);

    if (!cartDB) {
        throw new Error("Carrito no encontrado");
    }

    const existingProduct = cartDB.productos.find(
        item => item.producto.toString() === productId
    );

    if (existingProduct) {
        existingProduct.cantidad += cantidad;
    } else {
        cartDB.productos.push({
            producto: productId,
            cantidad
        });
    }

    await cartDB.save();

    await cartDB.populate('productos.producto');
    return calculateCartTotals(cartId);
};

// Mutation: eliminar producto del carrito
const removeProductFromCart = async (cartId, productId) => {
    const cartDB = await CartModel.findById(cartId).populate("productos.producto");
    if (!cartDB) {
        throw new Error("El carrito no existe");
    }

    cartDB.productos = cartDB.productos.filter(
        item => item.producto._id.toString() !== productId
    );

    await cartDB.save();

    return calculateCartTotals(cartId);
};


const updateProductQuantityInCart = async (cartId, productId, cantidad) => {
    const cartDB = await CartModel.findById(cartId).populate("productos.producto");
    if (!cartDB) {
        throw new Error("El carrito no existe");
    }

    const existingProduct = cartDB.productos.find(
        item => item.producto._id.toString() === productId
    );

    if (!existingProduct) {
        throw new Error("Producto no encontrado en el carrito");
    }

    if (cantidad <= 0) {
        cartDB.productos = cartDB.productos.filter(
            item => item.producto._id.toString() !== productId
        );
    } else {
        existingProduct.cantidad = cantidad;
    }

    await cartDB.save();

    return calculateCartTotals(cartId);
};

const calculateCartTotals = async (cartId) => {
    const ivaRate = 0.16; // Tasa de IVA

    const cart = await CartModel.findById(cartId)
        .populate('productos.producto')
        .populate('usuario');

    if (!cart) {
        throw new Error('El carrito no existe');
    }

    let subtotal = 0;

    cart.productos.forEach(item => {
        const producto = item.producto;

        if (producto && producto.price && item.cantidad) {
            // Calcula el precio base sin IVA
            const basePrice = producto.price / (1 + ivaRate);
            subtotal += basePrice * item.cantidad;
        } else {
            console.log("Producto sin precio o cantidad no válida:", producto);
        }
    });

    const iva = subtotal * ivaRate;
    const total = subtotal + iva;

    cart.subtotal = subtotal.toFixed(2); // Subtotal sin IVA
    cart.iva = iva.toFixed(2); // IVA calculado
    cart.total = total.toFixed(2); // Total (Subtotal + IVA)

    await cart.save();

    return cart;
};

module.exports = {
    getAllCarts,
    getCart,
    getInactiveCarts,
    createCart,
    closeCart,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantityInCart
};