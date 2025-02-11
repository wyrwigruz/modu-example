module.exports = {
	preset: 'jest-expo',
	cacheDirectory: './src/jest/cache',
	coverageThreshold: {
		global: {
			statements: 70,
		},
	},
	coverageDirectory: './src/jest/coverage',
	setupFiles: ['<rootDir>/src/jest/jest.setup.ts'],
	setupFilesAfterEnv: ['<rootDir>/src/jest/jest.setupAfterEnv.ts'],
};
