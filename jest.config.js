module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  verbose: true,
  collectCoverage: true,
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/out/'
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/out/'
  ],
  coverageDirectory: '__tests__/coverage',
  collectCoverageFrom: [
    'src/app/controllers/**/*.ts',
    'src/app/middlewares/**/*.ts',
    'src/services/**/*.ts',
    '!**/*.d.ts'
  ]
}
