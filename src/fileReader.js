import fs from 'node:fs';
import path from 'node:path';

export const readFileContent = (file) => {
  const filePath = path.resolve(file);
  const buffer = fs.readFileSync(filePath);
  return buffer;
};

export const getFileExtension = (file) => path.extname(file);
