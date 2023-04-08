import parseFile from './parsers.js';
import createDiffObject from './diffObject.js';
import chooseFormatter from './formatters/index.js';
import { readFileContent, getFileFormat } from './fileReader.js';

const genDiff = (filePath1, filePath2, format) => {
  const file1Content = readFileContent(filePath1);
  const file1Format = getFileFormat(filePath1);
  const file2Content = readFileContent(filePath2);
  const file2Format = getFileFormat(filePath2);
  const object1 = parseFile(file1Content, file1Format);
  const object2 = parseFile(file2Content, file2Format);
  const diffObject = createDiffObject(object1, object2);
  const formattedResult = chooseFormatter(diffObject, format);
  return formattedResult;
};

export default genDiff;
