const express = require('express');
const { calculateGrade, validateName } = require('./math');
const app = express();

// Middleware agar Express bisa membaca data JSON
app.use(express.json());

// Database sederhana di memori
let students = [];

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

// Export agar bisa diuji oleh supertest
module.exports = app;