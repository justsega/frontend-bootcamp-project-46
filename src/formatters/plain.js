import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const plainText = (diffObject, path = '') => {
  const lines = diffObject.map((elem) => {
    if (elem.type === 'added') {
      return `Property '${path}${elem.name}' was added with value: ${stringify(elem.value)}`;
    }
    if (elem.type === 'removed') {
      return `Property '${path}${elem.name}' was removed`;
    }
    if (elem.type === 'unchanged') {
      return null;
    }
    if (elem.type === 'updated') {
      return `Property '${path}${elem.name}' was updated. From ${stringify(
        elem.oldValue,
      )} to ${stringify(elem.newValue)}`;
    }
    if (elem.type === 'nested') {
      return plainText(elem.children, `${path + elem.name}.`);
    }
    return null;
  });
  const result = lines.flatMap((line) => line).filter((line) => line);

  return [...result].join('\n');
};

export default plainText;