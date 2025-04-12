module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['src', 'node_modules'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [6133],
        },
      },
    ],
  },
  testMatch: ['**/(*.test|*.spec).ts'],
  verbose: true,
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverage: true,
  collectCoverageFrom: ['./src/lib/**/!(*.d|*.spec|*.test|*.enum).ts'],
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85,
    },
  },
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'json-summary'],
  testTimeout: 10000,
}
