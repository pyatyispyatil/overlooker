const { aggregateProfiles } = require('./../aggregation');
const { deepMap, map } = require('./../objects-utils');
const { avg, median } = require('./../math-utils');

const strategies = {
  avg,
  median
};

const getAggregateMerger = (mergeStrategy) => (stats) => deepMap(stats, (obj) => map(obj, mergeStrategy));

const merge = (data, pages, mergeStrategyName = 'avg') => (
  aggregateProfiles(
    Object.entries(data)
      .filter(([pageName]) => !pages || pages.includes(pageName))
      .map(([, pageData]) => pageData),
    null,
    null,
    getAggregateMerger(strategies[mergeStrategyName])
  )
);

module.exports = {
  merge
};