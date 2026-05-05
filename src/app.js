const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Import logika matematika (pastikan file src/math.js sudah benar)
const { calculateGrade, validateName } = require('./math');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'students.json');

app.use(cors());
app.use(express.json());

// --- FUNGSI HELPER ---
const readData = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, '[]', 'utf8');
            return [];
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data || '[]');
    } catch (err) {
        return [];
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error("Gagal menulis file:", err);
    }
};

// --- ROUTES ---

// Ambil Data
app.get('/api/students', (req, res) => {
    res.status(200).json(readData());
});

// Tambah Data
app.post('/api/students', (req, res) => {
    let { name, score } = req.body;
    score = Number(score);

    if (!validateName(name) || calculateGrade(score) === 'Invalid') {
        return res.status(400).json({ message: 'Data tidak valid' });
    }

    const students = readData();
    const newStudent = { 
        id: Date.now(), 
        name: name.trim(), 
        score, 
        grade: calculateGrade(score) 
    };
    
    students.push(newStudent);
    writeData(students);
    res.status(201).json(newStudent);
});

// Hapus Data
app.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;
    let students = readData();
    const updated = students.filter(s => s.id !== Number(id));

    if (students.length === updated.length) {
        return res.status(404).json({ message: 'Data tidak ditemukan' });
    }

    writeData(updated);
    res.status(200).json({ message: 'Berhasil dihapus' });
});

// EKSPOR UNTUK JEST (Penting agar GitHub Actions Hijau)
module.exports = app;

// Jalankan Server (Hanya jika dijalankan langsung, bukan saat testing)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server jalan di http://localhost:${PORT}`);
    });
}