// import fs from 'fs';

// import ini from 'ini';
import yaml from 'js-yaml';
// import path from 'path';
// import { get } from 'lodash';

const getDataParse = (data, fileExt = 'json') => {
  if (fileExt === '.json') {
    return JSON.parse(data);
  } if (fileExt === '.yml' || fileExt === '.yaml') {
    return yaml.load(data);
  }
  return console.log('Unknown format');
};
export default getDataParse;
