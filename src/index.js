// import { readFileSync } from 'fs';
import fs from 'fs';
import { cwd } from 'process';
import path from 'path';
import getDataParse from './parsers.js';
import stylish from './formatters/stylish.js';
import makeTree from './makeTree.js';

const getData = (pathToFile) => {
  const currentDir = cwd();
  const absolutePath = path.resolve(currentDir, pathToFile);
  const contentFile = fs.readFileSync(absolutePath, 'utf-8');
  return contentFile;
};

const genDiff = (filepath1, filepath2) => {
  const fileExt1 = path.extname(filepath1);
  const fileExt2 = path.extname(filepath2);
  const file1 = getDataParse(getData(filepath1), fileExt1);
  const file2 = getDataParse(getData(filepath2), fileExt2);

  const innerView = makeTree(file1, file2);

  return stylish(innerView);
};
export default genDiff;
