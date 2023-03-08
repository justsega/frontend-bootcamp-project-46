import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const parseJSON = (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const convertedFile = JSON.parse(buffer);
  return convertedFile;
};

const parseYaml = (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const convertedFile = yaml.load(buffer, 'utf8');
  return convertedFile;
};

const parseFile = (file) => {
  const filePath = path.resolve(file);
  const fileExt = path.extname(filePath);
  if (fileExt === '.json') {
    return parseJSON(filePath);
  }
  if (fileExt === '.yaml' || fileExt === '.yml') {
    return parseYaml(filePath);
  }
  return 'Incorrect file extension';
};

export default parseFile;
