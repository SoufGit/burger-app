import React from 'react';
import '@testing-library/jest-dom';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import App from './App';

let elem;
// before each test, create `div` element
beforeEach(() => {
    elem = document.createElement('div'); // <div>...
    elem.setAttribute('id', 'app'); // <div id="app">...
    document.body.appendChild(elem); // <body><div>
});

// after each test, remove `div` element
afterEach(() => {
    elem = document.getElementById('app');
    unmountComponentAtNode(elem); // unmount React component
    elem.remove(); // remove
});

// test `App` component with `name` prop
test('App component with "Welcome to React"', () => {
    const props = {name: 'Welcome to React'}
    // render and prepare
    act(() => {
        render(<App {...props} />, elem);
    });

    const h2Elem = elem.querySelector('h2'); // <h1>

    // check for `<h2>` element content
    expect(h2Elem).toHaveTextContent('Welcome to React');
});