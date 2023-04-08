import _ from 'lodash';

const createDiffObject = (innerObj1, innerObj2) => {
  const commonKeys = _.union(Object.keys(innerObj1), Object.keys(innerObj2));
  const result = commonKeys.map((key) => {
    if (!_.has(innerObj1, key)) {
      return {
        name: key,
        value: innerObj2[key],
        type: 'added',
      };
    }
    if (!_.has(innerObj2, key)) {
      return {
        name: key,
        value: innerObj1[key],
        type: 'removed',
      };
    }
    if (_.isObject(innerObj1[key]) && _.isObject(innerObj2[key])
    && !_.isArray(innerObj1[key]) && !_.isArray(innerObj2[key])) {
      return {
        name: key,
        type: 'nested',
        children: createDiffObject(innerObj1[key], innerObj2[key]),
      };
    }
    if (innerObj1[key] !== innerObj2[key]) {
      return {
        name: key,
        oldValue: innerObj1[key],
        newValue: innerObj2[key],
        type: 'updated',
      };
    }
    return {
      name: key,
      value: innerObj1[key],
      type: 'unchanged',
    };
  });
  return _.sortBy(result, 'name');
};

export default createDiffObject;
