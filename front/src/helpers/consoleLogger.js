import {isDebug} from 'Helpers/debugMode';

/**
 * @description Logger allowed types.
 *
 * @type {{warn: string, trace: string, debug: string, log: string, assert: string, clear: string, error: string}}
 */
export const loggerTypes = {
    assert: 'assert',
    clear: 'clear',
    debug: 'debug',
    dir: 'dir',
    error: 'error',
    info: 'info',
    log: 'log',
    trace: 'trace',
    warn: 'warn'
};

/**
 * @description Output in the console the given message.
 *
 * @param {object} params - Init params.
 * @param {boolean} [params.clearConsoleOnInit=true] - Clean console on logger init.
 * @param {boolean} [params.willDisplayConsole=true] - True to use browser console logging.
 * @returns {Function} - Currying function.
 */
export const loggerOutput = ({
    clearConsoleOnInit = true,
    willDisplayConsole = true
}) => {
    // Clean console on logger init
    clearConsoleOnInit && window.console[loggerTypes.clear]();

    /**
     * @description Apply a console method, and do a callback if necessary.
     *
     * @param {string<loggerTypes>} loggerType - Type of log to execute.
     * @param {any} logInformation - Log information to send / display.
     */
    return (loggerType, ...logInformation) => {
        // Display console output
        willDisplayConsole && window.console[loggerType](...logInformation);
    };
};

/**
 * @description Export logger with hard coded init.
 *
 * @type {Function}
 *
 * @example logThat(loggerTypes.log, 'My message', 'other string', [1, 'string', {someKey: 'value'}]);
 */
export const logThat = loggerOutput({
    clearConsoleOnInit: isDebug(),
    willDisplayConsole: isDebug()
});

/**
 * @description Shortcut for logger log.
 * @param {any} logInformation - Data to log.
 * @returns {void} - Returns nothing.
 */
export const infoLog = (...logInformation) => logThat(loggerTypes.log, ...logInformation);

/**
 * @description Shortcut for logger warn.
 * @param {any} logInformation - Data to log.
 * @returns {void} - Returns nothing.
 */
export const warnLog = (...logInformation) => logThat(loggerTypes.warn, ...logInformation);

/**
 * @description Shortcut for logger error.
 * @param {any} logInformation - Data to log.
 * @returns {void} - Returns nothing.
 */
export const errorLog = (...logInformation) => logThat(loggerTypes.error, ...logInformation);
