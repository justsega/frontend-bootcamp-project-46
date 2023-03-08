import plainText from './plain.js';
import stylishPlus from './stylishPlus.js';
import stylish from './stylish.js';
import json from './json.js';

const chooseFormatter = (diffObject, format) => {
  if (format === 'stylish') {
    return stylish(diffObject);
  }
  if (format === 'plain') {
    return plainText(diffObject);
  }
  if (format === 'json') {
    return json(diffObject);
  }
  if (format === 'stylishPlus') {
    return stylishPlus(diffObject);
  }

  throw new Error('Incorrect format');
};

export default chooseFormatter;
