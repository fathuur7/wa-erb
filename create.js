const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function createScheduledMessage() {
    try {
        const newMessage = await prisma.scheduledMessage.create({
            data: {
                phoneNumber: '6285815245639', // Gantilah dengan data yang ingin dimasukkan
                message: 'Hello, this is a new scheduled message.',
                scheduledTime: new Date('2024-01-01T00:00:00Z'), // Jadwal waktu
            },
        });
        console.log('Data berhasil disimpan:', newMessage);
        return newMessage;
    } catch (error) {
        console.error('Gagal menyisipkan data:', error);
        throw error; // Lanjutkan lemparan error jika perlu
    }
}

// Ekspor fungsi
module.exports = createScheduledMessage;
