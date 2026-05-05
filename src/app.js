const express = require('express');
const cors = require('cors'); // Library untuk mengizinkan akses dari browser (Frontend)
const { calculateGrade, validateName } = require('./math');

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); // PENTING: Harus di atas agar Frontend bisa mengakses API
app.use(express.json()); // Agar Express bisa membaca data JSON dari body request

// Database sederhana di memori
let students = [];

// --- ROUTES ---

// Fitur 1: Tambah Mahasiswa & Nilai (Create)
app.post('/api/students', (req, res) => {
  const { name, score } = req.body;

  // Validasi menggunakan logika dari math.js
  if (!validateName(name) || calculateGrade(score) === 'Invalid') {
    return res.status(400).json({ message: 'Data tidak valid' });
  }

  const newStudent = {
    id: students.length + 1,
    name: name.trim(),
    score: score,
    grade: calculateGrade(score)
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Fitur 2: Ambil Semua Data (Read)
app.get('/api/students', (req, res) => {
  res.status(200).json(students);
});

// Export agar bisa diuji oleh supertest (Penting untuk testing Anda)
module.exports = app;

// --- SERVER START ---
const PORT = 3000;
// Cek jika file ini dijalankan langsung (bukan via test)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server nyala di http://localhost:${PORT}`);
    });
}