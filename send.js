const createScheduledMessage = require('./create');
const { Client } = require('whatsapp-web.js');
const { PrismaClient } = require('@prisma/client');
const qrcode = require('qrcode-terminal');

const prisma = new PrismaClient();
const client = new Client({
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu',
        ],
    }
});

// Generate QR Code untuk login WhatsApp
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR Code telah digenerate, silakan scan!');
});

client.on('authenticated', () => {
    console.log('Client terotentikasi!');
});

client.on('ready', async () => {
    console.log('Client WhatsApp siap!');
    
    // Set interval untuk mengirim pesan setiap 5 menit
    setInterval(async () => {
        try {
            const send = await createScheduledMessage(); // Panggil fungsi untuk membuat pesan terjadwal
            
            // Format nomor telepon dengan sufiks yang benar untuk pengiriman WhatsApp
            const phoneNumber = `${send.phoneNumber}@c.us`; // Tambahkan '@c.us' di akhir nomor
            
            // Gunakan client.sendMessage untuk mengirim pesan
            await client.sendMessage(phoneNumber, send.message);
            console.log(`Pesan berhasil dikirim ke ${send.phoneNumber}`);
        } catch (error) {
            console.error('Gagal mengirim pesan:', error);
        }
    }, 5 * 60 * 1000); // 5 menit dalam milidetik
});

client.initialize();

module.exports = client;
