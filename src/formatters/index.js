import plain from './plain.js';
import stylish from './stylish.js';

const format = (tree, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(tree);
    case 'stylish':
      return stylish(tree);
    case 'json':
      return JSON.stringify(tree);

    default:
      throw new Error(`Неверный формат: ${formatName}`);
  }
};
export default format;
