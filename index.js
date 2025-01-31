const express = require('express');
const app = express();
const client = require('./send');

// koneksi database mysql
const mysql = require('mysql2');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'fathur123',  
    database: 'prisma'
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

// endpoint untuk menambahkan data
app.post('/add', (req, res) => {
    const { phoneNumber, message } = req.body;
    con.query(`INSERT INTO scheduledMessage (phoneNumber, message) VALUES ('${phoneNumber}@c.us', '${message}')`, (err, result) => {
        if (err) throw err;
        console.log('Data berhasil disimpan:', result);
        res.send('Data berhasil disimpan!');
        res.status(200);
    });
});

// const localhost 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
