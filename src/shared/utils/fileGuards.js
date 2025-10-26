const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'application/pdf'];
const MAX_SIZE = 5 * 1024 * 1024;

export function validateFile(file) {
  if (!file) {
    return { valid: false, reason: 'Fayl tanlanmadi' };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, reason: 'Ruxsat etilmagan fayl turi' };
  }

  if (file.size > MAX_SIZE) {
    return { valid: false, reason: 'Fayl hajmi 5MB dan oshmasligi kerak' };
  }

  return { valid: true };
}

export function toHumanSize(bytes) {
  if (!bytes && bytes !== 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const size = bytes / Math.pow(1024, exponent);
  return `${size.toFixed(1)} ${units[exponent]}`;
}
