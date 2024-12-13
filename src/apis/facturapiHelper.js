const axios = require('axios');
const fs = require('fs');
const path = require('path');

const sendInvoiceByEmail = async (invoiceId, email) => {
    try {
        const response = await axios.post(
            `https://www.facturapi.io/v2/invoices/${invoiceId}/email`,
            { email },
            {
                headers: {
                    Authorization: `Bearer ${process.env.FACTURAPI_SECRET_KEY}`,
                },
            }
        );
        console.log("Factura enviada por correo:", response.data);
    } catch (error) {
        console.error(
            "Error al enviar la factura por correo:",
            error.response?.data?.message || error.message
        );
    }
};

const downloadFile = async (url, dest) => {
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${process.env.FACTURAPI_SECRET_KEY}`,
            },
            responseType: 'stream',
        });

        if (response.status !== 200) {
            throw new Error(`Error al descargar: ${response.statusText}`);
        }

        const writer = fs.createWriteStream(dest);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Error al descargar el archivo desde ${url}:`, error.message);
        throw error;
    }
};

const downloadInvoiceFiles = async (invoiceId) => {
    const destinationFolder = "/Users/aldo/Downloads/CARRITO/Facturas";

    // Asegúrate de que la carpeta de destino exista
    if (!fs.existsSync(destinationFolder)) {
        fs.mkdirSync(destinationFolder, { recursive: true });
    }

    try {
        const pdfUrl = `https://www.facturapi.io/v2/invoices/${invoiceId}/pdf`;
        const xmlUrl = `https://www.facturapi.io/v2/invoices/${invoiceId}/xml`;

        console.log("PDF URL:", pdfUrl);
        console.log("XML URL:", xmlUrl);

        const pdfPath = path.join(destinationFolder, `factura_${invoiceId}.pdf`);
        const xmlPath = path.join(destinationFolder, `factura_${invoiceId}.xml`);

        await downloadFile(pdfUrl, pdfPath);
        console.log(`Factura PDF descargada: ${pdfPath}`);

        await downloadFile(xmlUrl, xmlPath);
        console.log(`Factura XML descargada: ${xmlPath}`);
    } catch (error) {
        console.error(
            "Error al descargar archivos de la factura:",
            error.response?.data?.message || error.message
        );
    }
};

module.exports = {
    sendInvoiceByEmail,
    downloadInvoiceFiles,
};
