    const CartService = require('../services/CartService');
    const { sendCartEmail } = require('../apis/mailService'); 

    const CartResolvers = {
        Query: {
            carts: async () => {
                return await CartService.getAllCarts();
            },
            cart: async (_, { cartId }) => {
                return await CartService.getCart(cartId);
            },

            historial: async () => {
                return await CartService.getInactiveCarts();
            }
        },
        Mutation: {
            createCart: async (_, { user }) => {
                return await CartService.createCart(user);
            },

            closeCart: async (_, { cartId }) => {
                return await CartService.closeCart(cartId);
            },

            addProductToCart: async (_, { cartId, productId, cantidad }) => {
                return await CartService.addProductToCart(cartId, productId, cantidad);
            },

            removeProductFromCart: async (_, { cartId, productId }) => {
                return await CartService.removeProductFromCart(cartId, productId);
            },

            updateProductQuantityInCart: async (_, { cartId, productId, cantidad }) => {
                return await CartService.updateProductQuantityInCart(cartId, productId, cantidad);
            }
        }
    };

    module.exports = CartResolvers;
