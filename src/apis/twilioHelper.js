const accountSid = process.env.TWILIO_ACCOUNT_SID; // Configuración desde el archivo .env
const authToken = process.env.TWILIO_AUTH_TOKEN; // Configuración desde el archivo .env
const client = require('twilio')(accountSid, authToken);

const sendWhatsAppMessage = async () => {
    try {
        const response = await client.messages.create({
            from: 'whatsapp:+14155238886', // Número de prueba de Twilio para WhatsApp
            contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e', // Configura tu Content SID
            contentVariables: '{"1":"se genero factura exitosamente"}', // Variables de contenido para mensajes dinámicos
            to: 'whatsapp:+5213115931198', // Número fijo al que se enviará el mensaje
        });
        console.log(`Mensaje enviado con éxito: SID ${response.sid}`);
    } catch (error) {
        console.error(
            "Error al enviar mensaje por WhatsApp:",
            error.response?.data || error.message
        );
    }
};

module.exports = { sendWhatsAppMessage };
