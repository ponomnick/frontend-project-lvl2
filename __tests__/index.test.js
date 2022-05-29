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
  const diff = readFile('diff.json').trim();
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toEqual(diff);
});

test('diff yaml', () => {
  const diff = readFile('diff.yml').trim();
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(result).toEqual(diff);
});
