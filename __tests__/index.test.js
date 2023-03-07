import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import fs from 'fs';
import path from 'path';

const resultStylish = fs.readFileSync(
  path.resolve(process.cwd(), '__fixtures__/stylish_result.txt'),
  'utf-8',
);
const resultPlain = fs.readFileSync(
  path.resolve(process.cwd(), '__fixtures__/plain_result.txt'),
  'utf-8',
);
const resultJSON = fs.readFileSync(
  path.resolve(process.cwd(), '__fixtures__/json_result.txt'),
  'utf-8',
);

test('json input', () => {
  const file1 = '__fixtures__/file1.json';
  const file2 = '__fixtures__/file2.json';

  const actual1 = genDiff(file1, file2, 'plain');
  expect(actual1).toBe(resultPlain);

  const actual2 = genDiff(file1, file2, 'stylish');
  expect(actual2).toBe(resultStylish);

  //  const actual3 = genDiff(file1, file2, 'json');
  //  expect(actual3).toBe(resultJSON);
  
});

test('yaml input', () => {
  const file1 = '__fixtures__/file1.yaml';
  const file2 = '__fixtures__/file2.yaml';

  const actual1 = genDiff(file1, file2, 'plain');
  expect(actual1).toBe(resultPlain);

  const actual2 = genDiff(file1, file2, 'stylish');
  expect(actual2).toBe(resultStylish);

  //  const actual3 = genDiff(file1, file2, 'json');
  //  expect(actual3).toBe(resultJSON);
  
});

test('incorrect format', () => {
  const file1 = '__fixtures__/file1.txt';
  const file2 = '__fixtures__/file2.txt';

  const actual1 = genDiff(file1, file2, 'noFormat');
  expect(actual1).toBe('Incorrect format');
 
});

test('bad file extension', () => {
  const file1 = '__fixtures__/file1.txt';
  const file2 = '__fixtures__/file2.txt';

  const actual1 = genDiff(file1, file2, 'plain');
  expect(actual1).toBe('Incorrect file extension');
  
});