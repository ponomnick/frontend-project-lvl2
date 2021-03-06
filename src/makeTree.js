import _ from 'lodash';

const makeTree = (file1, file2) => {
  const uniqFile = { ...file1, ...file2 };
  const keys = Object.keys(uniqFile);
  return _.sortBy(keys).map((key) => {
    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      const children = makeTree(file1[key], file2[key]);
      return { key, children, status: 'parent' };
    }
    if (!_.has(file1, key)) {
      return { key, status: 'added', value: file2[key] };
    } if (!_.has(file2, key)) {
      return { key, status: 'delete', value: file1[key] };
    } if (file2[key] !== file1[key]) {
      return {
        key, status: 'changed', value1: file1[key], value2: file2[key],
      };
    }
    return { key, status: 'unchanged', value: file1[key] };
  });
};
export default makeTree;
