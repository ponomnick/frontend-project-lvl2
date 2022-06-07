const indent = (depth, spaceCount = 4) => ' '.repeat(spaceCount * depth - 2);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return `${value}`;
  }
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${indent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${indent(depth)}  }`,
  ].join('\n');
};

const stylish = (tree) => {
  const iter = (data, depth) => data.map((node) => {
    const getValue = (value, replacer) => `${indent(depth)}${replacer} ${node.key}: ${stringify(value, depth)}\n`;
    switch (node.status) {
      case 'added':
        return getValue(node.value, '+');
      case 'delete':
        return getValue(node.value, '-');
      case 'changed':
        return `${getValue(node.value1, '-')}${getValue(node.value2, '+')}`;
      case 'unchanged':
        return getValue(node.value, ' ');
      case 'parent':
        return `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${indent(depth)}  }\n`;
      default:
        throw new Error(`Несуществующий статус: ${node.status}`);
    }
  });
  return `{\n${iter(tree, 1).join('')}}`;
};

export default stylish;
