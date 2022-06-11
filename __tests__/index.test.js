import { fileURLToPath } from 'url';
// import { readFileSync } from 'node:fs';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('diff stylish', () => {
  const diff = readFile('diffcomplex').trim();
  const resultYml = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  const resultJson = genDiff(getFixturePath('complexfile1.json'), getFixturePath('complexfile2.json'));
  expect(resultYml).toEqual(diff);
  expect(resultJson).toEqual(diff);
});

test('diff plain', () => {
  const diff = readFile('diffplain').trim();
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
  expect(result).toEqual(diff);
});
test('diff json.stringify', () => {
  const diffJsonStringify = readFile('json').trim();
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json');
  expect(result).toEqual(diffJsonStringify);
});
