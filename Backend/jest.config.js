module.exports = {
  'testEnvironment': 'node',
  'roots': [
    '<rootDir>/tests',
  ],
  'testEnvironment': 'node',
  'moduleFileExtensions': ['js', 'json'],
  'testMatch': ['**/tests/**/*.test.js'],
  'transform': {
    '^.+\\.js$': 'babel-jest',
  },
};

