const presets = [
  ['@babel/env', { // какой пресет использовать
    targets: { // какие версии браузеров поддерживать
      edge: '83',
      firefox: '83',
      chrome: '83',
      safari: '14'
    },

    useBuiltIns: "entry"
  }]
];

module.exports = { presets };
