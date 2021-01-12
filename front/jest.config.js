// eslint-disable-next-line no-process-env
const willBreakOnCoverage = process.env.willBreakOnCoverage !== 'false';
const {readdirSync} = require('fs');

module.exports = {
    automock: false,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.(js|jsx)',
        '!src/**/*.mock.js',
        '!src/**/*.stories.js',
        '!src/test/**/*.js',
        '!src/webmodule/**/*.js'
    ],
    coverageDirectory: '<rootDir>/coverage-test',
    coverageReporters: ['json', 'lcov', 'text'],
    coverageThreshold: willBreakOnCoverage
        ? {
            global: {
                branches: 80,
                functions: 80,
                lines: 80,
                statements: 80
            }
        }
        : {},
    globals: {
        isDebugModeEnabled: true,
        MODULE_LIST: [...readdirSync(`${__dirname}/src/components`)]
    },
    moduleFileExtensions: ['js', 'jsx', 'jpeg'],
    moduleNameMapper: {
        '^Components(.*)$': '<rootDir>src/components$1',
        '^Helpers(.*)$': '<rootDir>src/helpers$1',
        '^Services(.*)$': '<rootDir>src/services$1',
        '^Store(.*)$': '<rootDir>src/store$1',
        '^Test(.*)$': '<rootDir>src/test$1',
        '^Utils(.*)$': '<rootDir>src/utils$1',
        '^Validators(.*)$': '<rootDir>src/validators$1',
        '.*\\.less$': '<rootDir>src/test/utils/styleMock.js',

        '.*\\.(jpg|jpeg|png|gif)$': 'jest-transform-stub'
    },
    roots: ['src'],
    setupFiles: [
        './setupJest.js'
    ],
    testMatch: [
        '<rootDir>/src/**/**/*.spec.jsx',
        '<rootDir>/src/**/**/*.test.jsx',
        '<rootDir>/src/**/**/*.step.jsx'
    ],
    transform: {
        '.*': 'babel-jest'
    },
    //transformIgnorePatterns: ['<rootDir>/node_modules/(?!(@axaclient-socle-src|ramda)/)'],
    verbose: true
};
