const request = require('supertest');
const app = require('../../src/app'); // Gunakan dua kali ../ karena hanya naik 2 tingkat

describe('Integration Testing: Student API', () => {
  
  test('Harus berhasil menambah data mahasiswa (POST /api/students)', async () => {
    const res = await request(app)
      .post('/api/students')
      .send({ name: 'Budi Utomo', score: 75 });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe('Budi Utomo');
    expect(res.body.grade).toBe('B'); // 75 harusnya B
  });

  test('Harus gagal jika input tidak valid (400 Bad Request)', async () => {
    const res = await request(app)
      .post('/api/students')
      .send({ name: 'Jo', score: 150 });
    
    expect(res.statusCode).toEqual(400);
  });

  test('Harus bisa mengambil semua data mahasiswa (GET /api/students)', async () => {
    const res = await request(app).get('/api/students');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Data yang baru ditambah harus muncul di daftar', async () => {
    await request(app).post('/api/students').send({ name: 'Andi Lau', score: 90 });
    const res = await request(app).get('/api/students');
    const andi = res.body.find(s => s.name === 'Andi Lau');
    expect(andi.grade).toBe('A');
  });

  test('Endpoint tidak dikenal harus return 404', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.statusCode).toEqual(404);
  });
});