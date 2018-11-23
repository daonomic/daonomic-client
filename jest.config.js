module.exports = {
  reporters: [
    'default',
    [
      'jest-junit',
      {
        output: './test-reports/unit.xml',
      },
    ],
  ],
  testURL: 'http://localhost',
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/source/$1',
  },
};
