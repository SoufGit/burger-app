'use strict';
let args = require('minimist')(process.argv.slice(2));
console.log('args', args);
let env;

if (args._.length > 0 && args._.indexOf('start') !== -1) {
    env = 'test';
}
else {
    env = args.env || 'dev';
}

process.env.REACT_WEBPACK_ENV = env;
console.log('env', env);
module.exports = require(`./webpack/webpack.config.${env}`);
