const objMap = (obj = {}, map) => Object.entries(obj)
  .reduce((acc, [key, value]) => {
    acc[key] = map(value, key);

    return acc;
  }, {});

const objReduce = (obj = {}, reducer, inception = {}) => Object.entries(obj)
  .reduce((acc, [key, value]) => {
    const [newValue, newKey = key] = reducer(value, key);

    acc[newKey] = newValue;

    return acc;
  }, inception);

const objSumm = (obj1 = {}, obj2 = {}) => objMap(obj1, (value, key) => (value || 0) + (obj2[key] || 0));

const objConcat = (obj1 = {}, obj2 = {}) => objMap(
  obj1,
  (value, key) => value != null && obj2[key] != null ? [].concat(value, obj2[key]) : [value != null ? value : obj2[key]]
);

const objDivide = (obj = {}, divider) => objMap(obj, (value) => value / divider);

const objSub = (obj1 = {}, obj2 = {}) => objMap(obj1, (value, key) => (value || 0) - (obj2[key] || 0));

const objPercent = (obj1 = {}, obj2 = {}) => objMap(obj1,
  (value, key) => (value && obj2[key] ? ((value / obj2[key]) * 100 - 100).toFixed(2) : 0) + '%'
);

const objFilter = (obj, filter) => Object.entries(obj).reduce((acc, [key, value]) => {
  if (filter(value, key)) {
    acc[key] = value;
  }

  return acc;
}, {});

module.exports = {
  objMap,
  objReduce,
  objDivide,
  objSumm,
  objConcat,
  objSub,
  objPercent,
  objFilter
};
