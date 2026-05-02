# UAS Pengujian Perangkat Lunak - Student API

Proyek ini adalah implementasi REST API sederhana untuk pengelolaan data nilai mahasiswa yang dilengkapi dengan pengujian otomatis (Automated Testing) dan laporan cakupan kode (Code Coverage).

## 🚀 Fitur Utama
*   **REST API**: Endpoint untuk menambah data mahasiswa dan mengambil daftar mahasiswa.
*   **Unit Testing**: 15 test cases untuk logika bisnis (perhitungan grade dan validasi).
*   **Integration Testing**: 5 test cases untuk memastikan endpoint API berfungsi.
*   **CI/CD**: Terintegrasi dengan GitHub Actions untuk pengujian otomatis setiap kali ada push.

## 🛠️ Teknologi yang Digunakan
*   **Node.js & Express**: Framework aplikasi.
*   **Jest**: Testing framework.
*   **Supertest**: Library untuk testing integration API.

## 📋 Hasil Pengujian
Berdasarkan pengujian terakhir, sistem berhasil lulus semua kriteria:
*   **Test Suites**: 2 passed (math.test.js & api.test.js)
*   **Total Tests**: 20 passed
*   **Code Coverage**: 100% pada logika utama aplikasi.

## 🏃 Cara Menjalankan Secara Lokal
1. Clone repositori:
   ```bash
   git clone [https://github.com/Marciano-alt/uas-ppl.git](https://github.com/Marciano-alt/uas-ppl.git)