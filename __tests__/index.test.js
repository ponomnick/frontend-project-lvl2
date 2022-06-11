import { fileURLToPath } from 'url';
// import { readFileSync } from 'node:fs';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('diff json', () => {
  const diff = readFile('diffcomplex').trim();
  const result = genDiff(getFixturePath('complexfile1.json'), getFixturePath('complexfile2.json'));
  expect(result).toEqual(diff);
});

test('diff yaml', () => {
  const diff = readFile('diffcomplex').trim();
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(result).toEqual(diff);
});
test('diff plain', () => {
  const diff = readFile('diffplain').trim();
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
  expect(result).toEqual(diff);
});
