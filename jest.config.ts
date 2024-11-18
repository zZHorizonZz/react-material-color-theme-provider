import type {Config} from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testTimeout: 10000,
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'],
    testMatch: ['<rootDir>/**/__tests__/**/*.test.ts', '<rootDir>/**/__tests__/**/*.test.tsx'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    cacheDirectory: '.jest-cache',
    coverageDirectory: '.jest-coverage',
    coveragePathIgnorePatterns: [
        'node_modules',
        'dist',
        'src/types',
        '__tests__',
    ],
    collectCoverage: true,
    reporters: [
        'default',
        [
            'jest-junit',
            {
                outputDirectory: './.jest-test-results',
                outputName: 'jest-results.xml',
            },
        ],
    ],
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.test.json',
                useESM: true,
            },
        ],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'mjs'],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
};

export default config;
