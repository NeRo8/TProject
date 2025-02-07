module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  reporters: ['default', 'jest-junit'],
  coverageReporters: ['text', 'text-summary', 'cobertura'],
};
