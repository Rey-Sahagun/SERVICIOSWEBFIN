# Proyecto: Carrito React GraphQL

## Descripción del Proyecto

Aplicación de comercio electrónico de pila completa desarrollada con React, GraphQL y Express, e integrada con múltiples servicios de terceros para garantizar una experiencia moderna y robusta.

## Tecnologías Utilizadas

### Backend:
- **Express**  
- **Apollo Server**  
- **GraphQL**

### Base de Datos:
- **MongoDB**

### Integración de Pagos:
- **Stripe**

### Facturación:
- **Facturapi**

### Autenticación:
- **Firebase Admin**

### Comunicación:
- **Node Mailjet**  
- **Twilio**

## Requisitos Previos

- **Node.js** (v16+ recomendado)  
- **MongoDB**  
- **npm** o **yarn**

## Instalación

Sigue estos pasos para configurar el proyecto:

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Rey-Sahagun/SERVICIOSWEBFIN
   cd CARRITO
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Configurar las variables de entorno:  
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   - `MONGODB_URI`  
   - `STRIPE_PUBLIC_KEY`  
   - `STRIPE_SECRET_KEY`  
   - `FIREBASE_JSON_PATH`  
   - `FIREBASE_DATABASE_URL`  
   - `MAILJET_PUBLIC_KEY`  
   - `MAILJET_SECRET_KEY`  
   - `TWILIO_ACCOUNT_SID`  
   - `TWILIO_AUTH_TOKEN`

## Ejecución del Proyecto

### En Modo Desarrollo

Inicia el servidor en modo desarrollo con el siguiente comando:

```bash
npm run dev
```

## Características

- API GraphQL completamente funcional  
- Carrito de compras dinámico  
- Integración de pagos con **Stripe**  
- Facturación electrónica mediante **Facturapi**  
- Notificaciones por correo electrónico  
- Envío de Whatsapp con **Twilio**

## Consideraciones para Despliegue

- Verifica que todas las variables de entorno estén correctamente configuradas.  
- Utiliza una instancia de **MongoDB** optimizada para producción.  
- Configura las políticas de **CORS** adecuadamente.  
- Implementa un sistema robusto de manejo de errores y registro de actividad.  

## Contribución

¡Las contribuciones son bienvenidas! Sigue estos pasos:

1. Realiza un fork del repositorio.  
2. Crea una nueva rama para tu funcionalidad:  

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. Realiza los cambios y confirma tus modificaciones:  

   ```bash
   git commit -m "Añadir una característica increíble"
   ```

4. Envía los cambios a tu rama:  

   ```bash
   git push origin feature/AmazingFeature
   ```

5. Abre una solicitud de extracción (**Pull Request**).

## Licencia

Este proyecto se distribuye bajo la licencia **ISC**.

## Agradecimientos

Agradecimientos especiales a las tecnologías y servicios que hicieron posible este proyecto:  

- **Apollo Server**  
- **Stripe**  
- **Facturapi**  
- **Firebase**  
- **Mailjet**  
- **Twilio**