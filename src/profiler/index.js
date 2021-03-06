const { prepareConfig } = require('./preparing.js');
const { fetchBuildData } = require('./build-data.js');
const { describePerformance, warming } = require('./pages-fetchers');

const profile = async (config) => {
  const preparedConfig = prepareConfig(config);
  const { pages, logger, count, cache } = preparedConfig;
  const percentCost = 0.99 / (count * pages.length + (cache ? pages.length : 0));
  let stopCache;

  if (!pages.length) {
    await logger('Nothing to profile');

    return {};
  }

  const buildData = await fetchBuildData(preparedConfig);

  if (cache) {
    stopCache = await warming(preparedConfig, percentCost);
  }

  const result = await describePerformance(preparedConfig, percentCost, buildData);

  if (cache && stopCache) {
      await stopCache();
  }

  return result;
};

module.exports = {
  profile
};
