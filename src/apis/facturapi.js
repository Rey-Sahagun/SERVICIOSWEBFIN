const Facturapi = require('facturapi').default
require('dotenv').config();
const facturapi = new Facturapi(process.env.FACTURAPI_SECRET_KEY);


async function createProduct(product) {
    const facturapiProduct = {
        description: product.description,
        product_key: '50202306',
        price: product.price,
    }

    return await facturapi.products.create(facturapiProduct);
}

async function updateProduct(id, product) {
    const facturapiProduct = {
        description: product.description,
        price: product.price,
    }

    return await facturapi.products.update(id, facturapiProduct);
}

async function deleteProduct(id) {
    return await facturapi.products.del(id);
}

async function createClient(client) {
    const facturapiClient = {
        legal_name: client.name,
        tax_id: client.rfc,
        tax_system: '608',
        email: client.email,
        address: {
            zip: client.zip + "",
        }
    }

    return await facturapi.customers.create(facturapiClient);
}

async function updateClient(id, client) {
    const facturapiClient = {
        email: client.email,
        address: {
            zip: client.zip + "",
        }
    }
    console.log(Object.keys(facturapi.invoices));
    return await facturapi.customers.update(id, facturapiClient);
}

async function deleteClient(id) {
    return await facturapi.customers.del(id);
}

async function createFactura(factura) {
    console.log(Object.keys(facturapi.invoices));
    return await facturapi.invoices.create(factura);
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,

    createClient,
    updateClient,
    deleteClient,

    createFactura
}