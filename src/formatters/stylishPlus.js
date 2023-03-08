import _ from 'lodash';
// eslint-disable-next-line no-unused-vars
import colors from 'colors';

const getChildren = (parentObject) => {
  const object = parentObject;
  const { children } = object;
  return children;
};

const info = () => {
  const firstString = `\n${'-'.repeat(25).bgBlue}INFORMATION${'-'.repeat(25).bgBlue}\n`;
  const addedValues = `${' '.repeat(5).bgGreen} Added values`;
  const removedValues = `${' '.repeat(5).bgRed} Removed values`;
  const updatedValues = `${' '.repeat(5).bgMagenta} Updated values`;
  const unchangedValues = `${' '.repeat(5).bgCyan} Unchanged values`;
  const nestedValues = `${' '.repeat(5).bgYellow} Nested values`;
  const lastString = `\n${'-'.repeat(61).bgBlue}\n`;
  return [firstString, addedValues, removedValues, updatedValues, unchangedValues, nestedValues, lastString].join('\n');
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

const formatter = (object) => {
  const iter = (innerValue, depth, spacesCount = 4) => {
    const indentSize = depth * spacesCount - 2;
    const bracketIndent = indentSize - spacesCount + 2;
    const result = innerValue.map((elem) => {
      if (elem.type === 'nested') {
        const children = getChildren(elem);
        return `${' '.repeat(indentSize)}  ${elem.name}: ${iter(children, depth + 1)}`.bgYellow;
      }
      if (elem.type === 'added') {
        return `${' '.repeat(indentSize)}${elem.symbol} ${elem.name}: ${stringify(
          elem.value,
          depth + 1,
        )}`.bgGreen;
      }
      if (elem.type === 'removed') {
        return `${' '.repeat(indentSize)}${elem.symbol} ${elem.name}: ${stringify(
          elem.value,
          depth + 1,
        )}`.bgRed;
      }
      if (elem.type === 'unchanged') {
        return `${' '.repeat(indentSize)}${elem.symbol} ${elem.name}: ${stringify(
          elem.value,
          depth + 1,
        )}`.bgCyan;
      }
      if (elem.type === 'updated') {
        return `${' '.repeat(indentSize)}${elem.symbol.oldValue} ${elem.name}: ${stringify(
          elem.oldValue,
          depth + 1,
        )}\n${' '.repeat(indentSize)}${elem.symbol.newValue} ${elem.name}: ${stringify(
          elem.newValue,
          depth + 1,
        )}`.bgMagenta;
      }

      return result;
    });
    return ['{', ...result, `${' '.repeat(bracketIndent)}}`].join('\n');
  };
  return iter(object, 1);
};

const stylishPlus = (object) => {
  const information = info();
  const formattedText = formatter(object);
  return [information, formattedText].join('\n');
};

export default stylishPlus;
