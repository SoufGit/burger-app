import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';

const pJson = require('../package.json');

// eslint-disable-next-line no-console
console.log('VERSION', pJson.version);
ReactDOM.render(
    <Router />,
    document.getElementById('root')
);
