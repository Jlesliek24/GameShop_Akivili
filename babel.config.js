// babel.config.js
module.exports = {
  presets: [
    'module:metro-react-native-babel-preset'
  ],
  plugins: [
    // 1) Enable the proposal for class properties (needed before private methods)
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    // 2) Enable the proposal for private methods
    ['@babel/plugin-proposal-private-methods', { loose: false }],
    // 3) Your dotenv plugin
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      safe: false,
      allowUndefined: false
    }],
    // (any other plugins you had...)
  ]
};
