exports.config = {
  namespace: 'skycons',
  generateDistribution: true,
  bundles: [
    { components: ['st-skycons'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
