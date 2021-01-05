module.exports = {
  roots: ['<rootDir>/'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/database/'],
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: [
    "./__test__/setup.ts"
  ],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  modulePathIgnorePatterns: [
    "<rootDir>/database/"
  ]
};
