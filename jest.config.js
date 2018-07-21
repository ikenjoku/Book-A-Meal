module.exports = {
  verbose: true,
  moduleFileExtensions: [ 'js', 'jsx'],
  setupFiles: [
    './client/__test__/setupTests.js',
    'raf/polyfill'
  ],
  testPathIgnorePatterns: [
    './server/test',
    './node_modules/',
    'client/__test__/mocks.js',
    'client/__test__/setupTests.js'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.jsx$': 'babel-jest'
  },
  snapshotSerializers: [
    "enzyme-to-json/serializer"
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$':
      './client/__test__/__mocks__/fileMock.js',
    '\\.(css|scss)$': './client/__test__/__mocks__/styleMock.js'
  }
};