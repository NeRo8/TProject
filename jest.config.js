module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  reporters: ['default', 'jest-junit', 'text'],
  coverageReporters: [
    'cobertura',
  ],
};
