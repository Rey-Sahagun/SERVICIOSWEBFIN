const { gql } = require('apollo-server-express');

const CartTypeDefs = gql`

    """
    Enum que representa el estado del carrito.
    """
    enum CartStatus {
        """El carrito está activo."""
        Activo
        """El carrito está inactivo."""
        Inactivo
    }

    """
    Representa un carrito de compras asociado a un usuario.
    """
    type Cart {
        """ID único del carrito."""
        _id: ID!
        """ID asociado a FacturAPI para la facturación."""
        facturapiId: String
        """Usuario propietario del carrito."""
        usuario: User!
        """Lista de productos en el carrito con sus cantidades."""
        productos: [CartProduct]!
        """Subtotal del carrito (sin impuestos)."""
        subtotal: Float!
        """IVA calculado para el carrito."""
        iva: Float!
        """Total del carrito (incluye impuestos)."""
        total: Float!
        """Fecha de creación del carrito."""
        createdAt: String!
        """Estado actual del carrito."""
        estatus: CartStatus!
        """Fecha de cierre del carrito, si aplica."""
        fechaCierre: String
    }

    """
    Representa un producto que puede añadirse al carrito.
    """
    type Product  {
        """ID único del producto."""
        _id: ID!
        """Nombre del producto."""
        name: String
        """Precio del producto."""
        price: Float
    }

    """
    Representa un usuario en el sistema.
    """
    type User {
        """ID único del usuario."""
        _id: ID!
        """Nombre completo del usuario."""
        name: String
        """Correo electrónico del usuario."""
        email: String
    }

    """
    Relación entre un producto y su cantidad en el carrito.
    """
    type CartProduct {
        """Cantidad de unidades del producto."""
        cantidad: Int!
        """Información del producto asociado."""
        producto: Product!
    }

    """
    Consultas disponibles para los carritos.
    """
    type Query {
        """Obtiene todos los carritos activos."""
        carts: [Cart]
        """Obtiene un carrito específico por su ID."""
        cart(cartId: ID!): Cart 
        """Obtiene el historial de carritos cerrados."""
        historial: [Cart]
    }

    """
    Mutaciones disponibles para los carritos.
    """
    type Mutation {
        """Crea un carrito nuevo para un usuario específico."""
        createCart(user: ID!): Cart
        """Cierra un carrito activo."""
        closeCart(cartId: ID!): Cart
        """Agrega un producto al carrito."""
        addProductToCart(cartId: ID!, productId: ID!, cantidad: Int!): Cart
        """Elimina un producto del carrito."""
        removeProductFromCart(cartId: ID!, productId: ID!): Cart
        """Actualiza la cantidad de un producto en el carrito."""
        updateProductQuantityInCart(cartId: ID!, productId: ID!, cantidad: Int!): Cart
    }

    """
    Entrada para crear un carrito.
    """
    input CartInput {
        """ID del usuario propietario del carrito."""
        usuario: ID!
    }
`;

module.exports = CartTypeDefs;

