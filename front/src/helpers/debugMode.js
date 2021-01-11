/**
 * @description Get environment variable provided by webpack.
 * Debug is set to true when launching liveBuild, but false otherwise.
 *
 * @returns {boolean} - Debug mode activated.
 */
export const isDebug = () => isDebugModeEnabled;
