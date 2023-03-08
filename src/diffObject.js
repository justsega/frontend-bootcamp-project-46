import _ from 'lodash';

const checker = {
  checkNested: (obj1, obj2, key) => _.has(obj1, key)
    && _.has(obj2, key)
    && _.isObject(obj1[key])
    && _.isObject(obj2[key])
    && !_.isArray(obj1[key])
    && !_.isArray(obj2[key]),
  checkAdded: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
  checkRemoved: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
  checkUpdated: (obj1, obj2, key) => _.has(obj1, key)
    && _.has(obj2, key)
    && obj1[key] !== obj2[key],
  checkUnchanged: (obj1, obj2, key) => _.has(obj1, key)
    && _.has(obj2, key)
    && obj1[key] === obj2[key],
};

const creator = {
  createAdded: (obj2, key) => ({
    name: key,
    value: obj2[key],
    type: 'added',
    symbol: '+',
  }),
  createRemoved: (obj1, key) => ({
    name: key,
    value: obj1[key],
    type: 'removed',
    symbol: '-',
  }),
  createUpdated: (obj1, obj2, key) => ({
    name: key,
    oldValue: obj1[key],
    newValue: obj2[key],
    type: 'updated',
    symbol: { oldValue: '-', newValue: '+' },
  }),
  createUnchanged: (obj1, key) => ({
    name: key,
    value: obj1[key],
    type: 'unchanged',
    symbol: ' ',
  }),
};
const createDiffObject = (obj1, obj2) => {
  const iter = (innerObj1, innerObj2) => {
    const commonKeys = _.union(Object.keys(innerObj1), Object.keys(innerObj2));
    const result = commonKeys.map((key) => {
      if (checker.checkNested(innerObj1, innerObj2, key)) {
        return {
          name: key,
          children: iter(innerObj1[key], innerObj2[key]),
          type: 'nested',
        };
      }
      if (checker.checkAdded(innerObj1, innerObj2, key)) {
        return creator.createAdded(innerObj2, key);
      }
      if (checker.checkRemoved(innerObj1, innerObj2, key)) {
        return creator.createRemoved(innerObj1, key);
      }
      if (checker.checkUnchanged(innerObj1, innerObj2, key)) {
        return creator.createUnchanged(innerObj1, key);
      }
      if (checker.checkUpdated(innerObj1, innerObj2, key)) {
        return creator.createUpdated(innerObj1, innerObj2, key);
      }
      return result;
    });
    return _.sortBy(result, 'name');
  };
  return iter(obj1, obj2);
};

export default createDiffObject;
