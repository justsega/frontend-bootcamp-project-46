import yaml from 'js-yaml';

const parseFile = (file, format) => {
  if (format === 'json') {
    return JSON.parse(file);
  }
  if (format === 'yaml' || format === 'yml') {
    return yaml.load(file, 'utf8');
  }
  throw new Error('Incorrect format');
};

export default parseFile;
