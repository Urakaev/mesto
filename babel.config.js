const presets = [
    ['@babel/env', { // какой пресет использовать
      targets: { // какие версии браузеров поддерживать
        edge: '87',
        firefox: '84',
        chrome: '87',
        safari: '14'
      },
  
      // использовать полифиллы для браузеров из свойства target
      // по умолчанию babel использует поллифиллы библиотеки core-js
      useBuiltIns: "entry"
    }]
  ];
  
  module.exports = { presets }; 