module.exports = {
  verbose: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  preset: undefined,
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  setupTestFrameworkScriptFile: "<rootDir>/internals/jest/setup.js",
  testMatch: [
    "**/?(*.)+(spec|test).(js|jsx|ts|tsx)"
  ],
  moduleDirectories: [
    "node_modules",
    "app"
  ],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json"
  ],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!lodash-es).+\\.js$"
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"]
};
