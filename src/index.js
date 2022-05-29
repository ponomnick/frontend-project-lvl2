// import { readFileSync } from 'fs';
import fs from 'fs';
import _ from 'lodash';
import { cwd } from 'process';
import path from 'path';
import getDataParse from './parsers.js';

const getData = (pathToFile) => {
  const currentDir = cwd();
  const absolutePath = path.resolve(currentDir, pathToFile);
  const contentFile = fs.readFileSync(absolutePath, 'utf-8');
  return contentFile;
};

export const stringify = (data, replacer = ' ', spacesCount = 2) => {
  const iter = (value, depth) => {
    if (typeof value !== 'object' || value === null) {
      return String(value);
    }
    const newDepth = depth + 1;
    const entries = Object.entries(value);
    const changedTree = entries
      .map((item) => {
        const [x, y] = item;
        const newX = replacer.repeat(spacesCount * newDepth) + x;
        const newItem = `${newX}: ${iter(y, depth + 1)}\n`;
        return newItem;
      });
    const result = changedTree.join('', '');
    return `{\n${result}${replacer.repeat((spacesCount * newDepth) - spacesCount)}}`;
  };
  return iter(data, 0);
};

const genDiff = (filepath1, filepath2) => {
  const fileExt1 = path.extname(filepath1);
  const fileExt2 = path.extname(filepath2);
  const file1 = getDataParse(getData(filepath1), fileExt1);
  const file2 = getDataParse(getData(filepath2), fileExt2);

  const uniqFile = { ...file1, ...file2 };

  const keys = Object.keys(uniqFile);
  const sortKeys = _.sortBy(keys)
    .reduce((diff, key) => {
      const result = diff;
      if (!_.has(file1, key)) {
        result[`+ ${key}`] = file2[key];
      } else if (!_.has(file2, key)) {
        result[`- ${key}`] = file1[key];
      } else if (file2[key] !== file1[key]) {
        result[`- ${key}`] = file1[key];
        result[`+ ${key}`] = file2[key];
      } else {
        result[`  ${key}`] = file1[key];
      }
      return result;
    }, []);

  return stringify(sortKeys);
};
export default genDiff;
