import _ from 'lodash';

const getChildren = (parentObject) => {
  const object = parentObject;
  const { children } = object;
  return children;
};

const stringify = (value, depth, spacesCount = 4) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const indentSize = depth * spacesCount - 2;
  const bracketIndent = indentSize - spacesCount + 2;
  const lines = Object.entries(value).map(
    ([key, val]) => `${' '.repeat(indentSize)}  ${key}: ${stringify(val, depth + 1)}`,
  );
  return ['{', ...lines, `${' '.repeat(bracketIndent)}}`].join('\n');
};

const stylish = (object) => {
  const iter = (innerValue, depth, spacesCount = 4) => {
    const indentSize = depth * spacesCount - 2;
    const bracketIndent = indentSize - spacesCount + 2;
    const result = innerValue.map((elem) => {
      if (elem.type === 'nested') {
        const children = getChildren(elem);
        return `${' '.repeat(indentSize)}  ${elem.name}: ${iter(children, depth + 1)}`;
      }
      if (elem.type === 'added') {
        return `${' '.repeat(indentSize)}+ ${elem.name}: ${stringify(
          elem.value,
          depth + 1,
        )}`;
      }
      if (elem.type === 'removed') {
        return `${' '.repeat(indentSize)}- ${elem.name}: ${stringify(
          elem.value,
          depth + 1,
        )}`;
      }
      if (elem.type === 'unchanged') {
        return `${' '.repeat(indentSize)}  ${elem.name}: ${stringify(
          elem.value,
          depth + 1,
        )}`;
      }
      if (elem.type === 'updated') {
        return `${' '.repeat(indentSize)}- ${elem.name}: ${stringify(
          elem.oldValue,
          depth + 1,
        )}\n${' '.repeat(indentSize)}+ ${elem.name}: ${stringify(
          elem.newValue,
          depth + 1,
        )}`;
      }

      return result;
    });
    return ['{', ...result, `${' '.repeat(bracketIndent)}}`].join('\n');
  };
  return iter(object, 1);
};

export default stylish;
