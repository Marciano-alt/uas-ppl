const { calculateGrade, validateName } = require('../../src/math');

describe('Unit Testing Lengkap', () => {
  
  // Menguji semua kemungkinan Grade (untuk menutup uncovered lines 5-7)
  test('Skor 90 harus A', () => { expect(calculateGrade(90)).toBe('A'); });
  test('Skor 80 harus B', () => { expect(calculateGrade(80)).toBe('B'); });
  test('Skor 70 harus C', () => { expect(calculateGrade(70)).toBe('C'); });
  test('Skor 55 harus D', () => { expect(calculateGrade(55)).toBe('D'); });
  test('Skor 40 harus E', () => { expect(calculateGrade(40)).toBe('E'); });
  
  // Menguji validasi skor (Edge Cases)
  test('Skor lebih dari 100 harus Invalid', () => { expect(calculateGrade(110)).toBe('Invalid'); });
  test('Skor negatif harus Invalid', () => { expect(calculateGrade(-10)).toBe('Invalid'); });
  test('Skor bukan angka harus Invalid', () => { expect(calculateGrade('seratus')).toBe('Invalid'); });

  // Menguji Validasi Nama (7 Cases)
  test('Nama "Budi" harus valid', () => { expect(validateName('Budi')).toBe(true); });
  test('Nama "Jo" harus invalid (terlalu pendek)', () => { expect(validateName('Jo')).toBe(false); });
  test('Nama kosong harus invalid', () => { expect(validateName('')).toBe(false); });
  test('Nama null harus invalid', () => { expect(validateName(null)).toBe(false); });
  test('Nama angka harus invalid', () => { expect(validateName(123)).toBe(false); });
  test('Nama hanya spasi harus invalid', () => { expect(validateName('   ')).toBe(false); });
  test('Nama undefined harus invalid', () => { expect(validateName(undefined)).toBe(false); });
});