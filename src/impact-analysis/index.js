const { prepareConfig } = require('../profiler/preparing.js');
const { fetchBuildData } = require('../profiler/build-data.js');
const { content } = require('../profiler/pages-fetchers');
const { compareDescriptions } = require('./description-comparison.js');
const { describePages } = require('./description-builder.js');
const { getImpactedPages, affectConfigByImpact } = require('./config-filtration.js');

const impactAnalysis = async (previousDescriptions, config, elementsFilter) => {
  const preparedConfig = prepareConfig(config);
  const { pages, logger } = preparedConfig;

  if (!pages.length) {
    await logger('Nothing to profile');

    return {};
  }

  await logger('start impact analysis');

  try {
    const buildData = await fetchBuildData(preparedConfig);

    const profiles = await content(preparedConfig, buildData);

    const descriptions = describePages(profiles, preparedConfig, elementsFilter);

    const difference = previousDescriptions && compareDescriptions(previousDescriptions, descriptions);

    await logger(`impact analysis done!`);

    return {
      difference,
      descriptions,
      pages: difference ? getImpactedPages(difference) : pages.map(({ name }) => name)
    };
  } catch (e) {
    await logger(`cannot collect impact data: ${e.stack}`);

    return null;
  }
};

module.exports = {
  impactAnalysis,
  affectConfigByImpact
};
