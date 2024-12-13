const { gql } = require('apollo-server-express');

const CartTypeDefs = gql`

    enum CartStatus {
        Activo
        Inactivo
    }

    type Cart {
        _id: ID!
        facturapiId: String
        usuario: User!
        productos: [CartProduct]!
        subtotal: Float!
        iva: Float!
        total: Float!
        createdAt: String!
        estatus: CartStatus!
        fechaCierre: String
    }

    type Product  {
        _id: ID!
        name: String
        price: Float
    }

    type User {
        _id: ID!
        name: String
        email: String
    }

    type CartProduct {
        cantidad: Int!
        producto: Product!
    }

    type Query {
        carts: [Cart]
        cart(cartId: ID!):Cart 
        historial: [Cart]
    }

    type Mutation {
        createCart( user: ID!): Cart
        closeCart(cartId: ID!): Cart
        addProductToCart(cartId: ID!, productId: ID!, cantidad: Int!): Cart
        removeProductFromCart(cartId: ID!, productId: ID!): Cart
        updateProductQuantityInCart(cartId: ID!, productId: ID!, cantidad: Int!): Cart
    }

    input CartInput {
        usuario: ID!
    }
`;

module.exports = CartTypeDefs;
