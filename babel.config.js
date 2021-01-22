const presets = [
  ['@babel/env', { // какой пресет использовать
    targets: { // какие версии браузеров поддерживать
      edge: '83',
      firefox: '83',
      chrome: '83',
      safari: '14'
    },

    // использовать полифиллы для браузеров из свойства target
    // по умолчанию babel использует поллифиллы библиотеки core-js
    useBuiltIns: "entry"
  }]
];

module.exports = { presets };
