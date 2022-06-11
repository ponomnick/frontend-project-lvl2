import _ from 'lodash';

const stringify = (value) => {
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  if (value === null) {
    return null;
  }
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return String(value);
};

const plain = (tree) => {
  const iter = (item, path) => item
    .filter((node) => node.status !== 'unchanged')
    .map((node) => {
      const keys = [...path, node.key];

      const property = keys.join('.');

      switch (node.status) {
        case 'added':
          return `Property '${property}' was added with value: ${stringify(node.value)}`;

        case 'delete':
          return `Property '${property}' was deleted`;
        case 'changed':
          return `Property '${property}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'parent':
          return iter(node.children, keys);

        default:
          throw new Error(`Неверный статус ${node.status}`);
      }
    }).join('\n');

  return iter(tree, []);
};
export default plain;
