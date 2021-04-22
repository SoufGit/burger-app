import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import pkg from '../package.json';

//const pJson = require('../package.json');

// eslint-disable-next-line no-console
//console.log('VERSION', pJson.version);

console.log('VERSION', pkg.version);
ReactDOM.render(
    <Router />,
    document.getElementById('root')
);
