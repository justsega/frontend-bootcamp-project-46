import yaml from 'js-yaml';

const parseFile = (file, fileExt) => {
  if (fileExt === '.json') {
    return JSON.parse(file);
  }
  if (fileExt === '.yaml' || fileExt === '.yml') {
    return yaml.load(file, 'utf8');
  }
  throw new Error('Incorrect file extension');
};

export default parseFile;
