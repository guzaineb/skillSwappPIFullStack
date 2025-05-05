module.exports = {
    roots: ['<rootDir>/backend'],
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json'],
    testMatch: ['**/tests/**/*.test.js'],
    modulePathIgnorePatterns: ['<rootDir>/frontend/'],
  };