const calculateGrade = (score) => {
  if (typeof score !== 'number' || score < 0 || score > 100) return 'Invalid';
  if (score >= 85) return 'A';
  if (score >= 75) return 'B';
  if (score >= 65) return 'C';
  if (score >= 50) return 'D';
  return 'E';
};

const validateName = (name) => {
  if (!name || typeof name !== 'string') return false;
  return name.trim().length >= 3;
};

// Pastikan bagian ini ADA di baris paling bawah
module.exports = { calculateGrade, validateName };