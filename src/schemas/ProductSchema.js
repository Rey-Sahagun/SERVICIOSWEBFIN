const { gql } = require('apollo-server-express');

const ProductTypeDefs = gql`
    """
    Enum que representa las categorías de los productos.
    """
    enum Category {
        """Productos de bebidas."""
        Bebidas
        """Productos lácteos."""
        Lacteos
        """Carnes y productos cárnicos."""
        Carnes
        """Frutas frescas."""
        Frutas
        """Verduras frescas."""
        Verduras
        """Productos de panadería."""
        Panaderia
        """Dulces y golosinas."""
        Dulces
        """Productos de limpieza."""
        Limpieza
        """Productos de higiene personal."""
        Higiene
        """Productos enlatados."""
        Enlatados
    }

    """
    Representa un producto disponible en el inventario.
    """
    type Product {
        """ID único del producto."""
        _id: ID!
        """ID asociado a FacturAPI."""
        facturapiId: String
        """Nombre del producto."""
        name: String!
        """Descripción del producto."""
        description: String!
        """Precio del producto."""
        price: Float!
        """Categoría del producto."""
        category: Category!
        """Marca del producto."""
        brand: String!
        """Cantidad de unidades disponibles en inventario."""
        stock: Int!
        """Fecha de creación del producto."""
        createdAt: String!
        """Imágenes asociadas al producto."""
        images: [String]!
    }

    """
    Consultas disponibles para los productos.
    """
    type Query {
        """Obtiene todos los productos disponibles."""
        products: [Product]
        """Obtiene un producto específico por su ID."""
        product(_id: ID!): Product
    }

    """
    Mutaciones disponibles para la gestión de productos.
    """
    type Mutation {
        """Crea un nuevo producto."""
        createProduct(product: ProductInput!): Product
        """Actualiza un producto existente."""
        updateProduct(_id: ID!, product: ProductInput!): Product
        """Elimina un producto por su ID."""
        deleteProduct(_id: ID!): Product
    }

    """
    Entrada para crear o actualizar un producto.
    """
    input ProductInput {
        """Nombre del producto."""
        name: String!
        """Descripción del producto."""
        description: String!
        """Precio del producto."""
        price: Float!
        """Categoría del producto."""
        category: Category!
        """Marca del producto."""
        brand: String!
        """Cantidad de unidades disponibles en inventario."""
        stock: Int
        """URLs de las imágenes asociadas al producto."""
        images: [String]!
    }
`;

module.exports = ProductTypeDefs;
