module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	testResultsProcessor: 'jest-sonar-reporter',
	coveragePathIgnorePatterns: [
		'/node_modules/',
		'/src/tests/',
		'/build/',
		'/coverage',
	],
};
