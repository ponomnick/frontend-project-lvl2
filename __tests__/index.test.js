import { fileURLToPath } from 'url';
// import { readFileSync } from 'node:fs';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
// console.log(__dirname);
// console.log(readFile(file1));
test('diff', () => {
  const file1 = readFile('file1.json').trim();
  const file2 = readFile('file2.json').trim();
  const diff = readFile('diff.json').trim();

  const result = genDiff(file1, file2);
  console.log(result);
  expect(result).toEqual(diff);
});
