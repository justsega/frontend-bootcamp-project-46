import parseFile from './parsers.js';
import createDiffObject from './diffObject.js';
import chooseFormatter from './formatters/index.js';

const genDiff = (filePath1, filePath2, format) => {
  const object1 = parseFile(filePath1);
  const object2 = parseFile(filePath2);
  const diffObject = createDiffObject(object1, object2);
  const formattedResult = chooseFormatter(diffObject, format);
  return formattedResult;
};

export default genDiff;
