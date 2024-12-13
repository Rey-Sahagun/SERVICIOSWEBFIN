const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

require('dotenv').config();
const ProductResolvers = require('./resolvers/ProductResolver');
const UserResolvers = require('./resolvers/UserResolver');
const CartResolvers = require('./resolvers/CartResolver');

const ProductTypeDefs = require('./schemas/ProductSchema');
const UserTypeDefs = require('./schemas/UserSchema');
const CartTypeDefs = require('./schemas/CartSchema');

const { sendWhatsAppMessage } = require('./apis/twilioHelper');


const startServer = async () => {
    try {
        // Conectar a la base de datos MongoDB
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log('Conectado a MongoDB'))
            .catch(err => console.error('Error al conectar a MongoDB:', err));
        // Combinar todos los typeDefs y resolvers
        const typeDefs = [ProductTypeDefs, UserTypeDefs, CartTypeDefs];
        const resolvers = [ProductResolvers, UserResolvers, CartResolvers];

        // // Crear una nueva instancia de ApolloServer
        // const server = new ApolloServer({ typeDefs, resolvers });

        // server.listen().then(({ url }) => {
        //     console.log(`Servidor iniciado en ${url}`);
        // });

        // Crear una nueva instancia de ApolloServer
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            introspection: true, // Permite la introspección del esquema
            playground: {
                settings: {
                    'editor.theme': 'dark', // Si prefieres un tema claro
                },
            },
        });

        server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
            console.log(`Servidor iniciado en ${url}`);
            //sendWhatsAppMessage();
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();

