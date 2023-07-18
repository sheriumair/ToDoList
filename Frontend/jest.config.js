module.exports = {
    "testEnvironment":"jsdom",
    "roots": [
      "<rootDir>/tests"
    ],
    "transform": {
      "^.+\\.jsx?$": "babel-jest"
    },
    "setupFilesAfterEnv": ["@testing-library/jest-dom/extend-expect"],
    "moduleNameMapper":{
        "\\.(css)$": "<rootDir>/__mocks__/styleMock.js",
         "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
        }
  }