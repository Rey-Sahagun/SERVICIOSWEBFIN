# Proyecto Carrito React GraphQL

## Descripción del Proyecto

Aplicación de comercio electrónico de pila completa construida con React, GraphQL, Express e integrada con múltiples servicios de terceros.

## Tecnologías Utilizadas

- Backend:
  - Express
  - Apollo Server
  - GraphQL
- Base de Datos:
  - MongoDB
- Integración de Pagos:
  - Stripe
- Facturación:
  - Facturapi
- Autenticación:
  - Firebase Admin
- Comunicación:
  - Node Mailjet
  - Twilio

## Requisitos Previos

- Node.js (v16+ recomendado)
- MongoDB
- npm o yarn

## Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/SoyYosefh/dsw-u2-carritoGrapfQL.git
cd carrito-react-graphql
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno

Crea un archivo `.env` en el directorio raíz con las siguientes variables:

- `MONGODB_URI`
- `STRIPE_PUBLIC_KEY`
- `STRIPE_SECRET_KEY`
- `FIREBASE_JSON_PATH`
- `FIREBASE_DATABASE_URL`
- `MAILJET_PUBLIC_KEY`
- `MAILJET_SECRET_KEY`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`

## Ejecutando el Proyecto

### Modo Desarrollo

```bash
npm run dev
```

## Características

- API GraphQL
- Funcionalidad de carrito de compras
- Integración de pagos con Stripe
- Facturación electrónica con Facturapi
- Notificaciones por correo electrónico
- Capacidades de SMS

## Consideraciones para Despliegue

- Asegurarse de que todas las variables de entorno estén configuradas correctamente
- Utilizar una instancia de MongoDB lista para producción
- Configurar ajustes de CORS
- Establecer un manejo de errores y registro adecuado

## Contribución

1. Bifurca el repositorio
2. Crea tu rama de características (`git checkout -b caracteristica/AmazingFeature`)
3. Confirma tus cambios (`git commit -m 'Añadir alguna característica increíble'`)
4. Envía los cambios a la rama (`git push origin caracteristica/AmazingFeature`)
5. Abre una Solicitud de Extracción

## Licencia

Distribuido bajo la Licencia ISC.

## Reconocimientos

- Apollo Server
- Stripe
- Facturapi
- Firebase
- Mailjet
- Twilio
