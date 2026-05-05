const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Lokasi database JSON
const DATA_FILE = path.join(__dirname, 'students.json');

app.use(cors());
app.use(express.json());

// --- LOGIKA UTAMA ---

const calculateGrade = (score) => {
    if (score < 0 || score > 100 || isNaN(score)) return 'Invalid';
    if (score >= 85) return 'A';
    if (score >= 75) return 'B';
    if (score >= 60) return 'C';
    if (score >= 45) return 'D';
    return 'E';
};

const validateName = (name) => {
    return name && name.trim().length >= 3;
};

const readData = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, '[]', 'utf8');
            return [];
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data || '[]');
    } catch (err) {
        console.error("Gagal membaca file:", err);
        return [];
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        console.log("📍 File ditulis ke: ", DATA_FILE); // Tambahkan baris ini
    } catch (err) {
        console.error("❌ Gagal menulis ke file:", err);
    }
};
// --- ROUTES ---

app.get('/api/students', (req, res) => {
    res.json(readData());
});

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
        score: score,
        grade: calculateGrade(score)
    };

    students.push(newStudent);
    writeData(students);
    res.status(201).json(newStudent);
});

app.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;
    let students = readData();
    const updatedStudents = students.filter(s => s.id !== Number(id));

    if (students.length === updatedStudents.length) {
        return res.status(404).json({ message: 'Data tidak ditemukan' });
    }

    writeData(updatedStudents);
    res.json({ message: 'Berhasil dihapus' });
});

// Menjalankan Server
app.listen(PORT, () => {
    console.log(`🚀 Server jalan di http://localhost:${PORT}`);
    console.log(`📂 File database: ${DATA_FILE}`);
});