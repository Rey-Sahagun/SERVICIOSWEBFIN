const { gql } = require('apollo-server-express');

const UserTypeDefs = gql`
    """
    Representa un usuario del sistema.
    """
    type User {
        """ID único del usuario."""
        _id: ID!
        """ID asociado a FacturAPI para la facturación."""
        facturapiId: String
        """Registro Federal de Contribuyentes (RFC) del usuario."""
        rfc: String!
        """Nombre completo del usuario."""
        name: String!
        """Correo electrónico del usuario."""
        email: String!
        """Contraseña del usuario (encriptada)."""
        password: String!
        """Dirección del usuario."""
        direccion: String!
        """Código postal de la dirección del usuario."""
        zip: Int!
        """Teléfono del usuario."""
        tel: Int!
        """Fecha de creación del usuario."""
        createdAt: String!
        """Rol del usuario en el sistema (por ejemplo, 'admin' o 'cliente')."""
        role: String!
        """Método de pago preferido del usuario."""
        payMethod: String!
    }

    """
    Consultas disponibles para los usuarios.
    """
    type Query {
        """Obtiene la lista completa de usuarios."""
        users: [User]
        """Obtiene un usuario específico por su ID."""
        user(_id: ID!): User
    }

    """
    Mutaciones disponibles para la gestión de usuarios.
    """
    type Mutation {
        """Crea un nuevo usuario."""
        createUser(user: UserInput!): User
        """Actualiza un usuario existente."""
        updateUser(_id: ID!, user: UserInput!): User
        """Elimina un usuario por su ID."""
        deleteUser(_id: ID!): User
    }

    """
    Entrada para crear o actualizar un usuario.
    """
    input UserInput {
        """Registro Federal de Contribuyentes (RFC) del usuario."""
        rfc: String!
        """Nombre completo del usuario."""
        name: String!
        """Correo electrónico del usuario."""
        email: String!
        """Contraseña del usuario."""
        password: String!
        """Dirección del usuario."""
        direccion: String!
        """Código postal de la dirección del usuario."""
        zip: Int!
        """Teléfono del usuario."""
        tel: Int!
        """Rol del usuario en el sistema (por ejemplo, 'admin' o 'cliente')."""
        role: String!
        """Método de pago preferido del usuario."""
        payMethod: String!
    }
`;

module.exports = UserTypeDefs;
