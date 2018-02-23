exports.config = {
  namespace: 'skycons',
  generateDistribution: true,
  serviceWorker: false
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
