module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  coverageReporters: [
    'json'
  ],
  errorOnDeprecated: true,
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '.*\\.(ts)$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      babelConfig: false,
      diagnostics: {
        warnOnly: false
      }
    }
  }
};
