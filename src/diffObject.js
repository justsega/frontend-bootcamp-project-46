import _ from 'lodash';

const createDiffObject = (obj1, obj2) => {
  const iter = (innerObj1, innerObj2) => {
    const commonKeys = _.union(Object.keys(innerObj1), Object.keys(innerObj2));
    const result = commonKeys.map((key) => {
      if (_.has(innerObj1, key) && _.has(innerObj2, key)
      && _.isObject(innerObj1[key]) && _.isObject(innerObj2[key])
      && !_.isArray(innerObj1[key]) && !_.isArray(innerObj2[key])) {
        return {
          name: key,
          children: iter(innerObj1[key], innerObj2[key]),
          type: 'nested',
        };
      }
      if (!_.has(innerObj1, key) && _.has(innerObj2, key)) {
        return {
          name: key,
          value: innerObj2[key],
          type: 'added',
          symbol: '+',
        };
      }
      if (_.has(innerObj1, key) && !_.has(innerObj2, key)) {
        return {
          name: key,
          value: innerObj1[key],
          type: 'removed',
          symbol: '-',
        };
      }
      if (_.has(innerObj1, key) && _.has(innerObj2, key) && innerObj1[key] === innerObj2[key]) {
        return {
          name: key,
          value: innerObj1[key],
          type: 'unchanged',
          symbol: ' ',
        };
      }
      if (_.has(innerObj1, key) && _.has(innerObj2, key) && innerObj1[key] !== innerObj2[key]) {
        return {
          name: key,
          oldValue: innerObj1[key],
          newValue: innerObj2[key],
          type: 'updated',
          symbol: { oldValue: '-', newValue: '+' },
        };
      }
      return result;
    });
    return _.sortBy(result, 'name');
  };
  return iter(obj1, obj2);
};

export default createDiffObject;
