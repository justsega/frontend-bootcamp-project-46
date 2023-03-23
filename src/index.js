import parseFile from './parsers.js';
import createDiffObject from './diffObject.js';
import chooseFormatter from './formatters/index.js';
import { readFileContent, getFileExtension } from './fileReader.js';

const genDiff = (filePath1, filePath2, format) => {
  const file1Content = readFileContent(filePath1);
  const file1Extension = getFileExtension(filePath1);
  const file2Content = readFileContent(filePath2);
  const file2Extension = getFileExtension(filePath2);
  const object1 = parseFile(file1Content, file1Extension);
  const object2 = parseFile(file2Content, file2Extension);
  const diffObject = createDiffObject(object1, object2);
  const formattedResult = chooseFormatter(diffObject, format);
  return formattedResult;
};

export default genDiff;
