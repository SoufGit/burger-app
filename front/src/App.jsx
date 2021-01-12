import React, {Component, useState} from 'react';
import logo from './assets/images/xlBurger1.jpeg';


class App extends Component {
    render() {
        return (
            <div className="app">
                <div className="app-header">
                    <img src={logo} className="app-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="app-intro">
                    Ptite démo pour les potos
                </p>
            </div>

        );
    }
}

export default App;

// export const App = (props) => {
//     const [count, setCount] = useState(0);

//     return (
//         <div className='profile'>
//             <h1 className='profile__name'>{props.name}</h1>
//             <h2 className='profile__count'>count: {count}</h2>
//             <button
//                 className='profile__increment__button'
//                 onClick={() => setCount(count + 1)}
//                 disabled={count === 3}
//             >Increment</button>
//         </div>
//     );
// };


/*
 * Class App extends Component {
 *     render() {
 *         return (
 *             <LayoutContainer>
 *                 <div className="App">
 *                     <div className="App-header">
 *                          <img src={logo} className="App-logo" alt="logo" />
 *                         <h2>Welcome to React</h2>
 *                     </div>
 *                     <p className="App-intro">
 *                         Ptite démo pour les potos
 *         </p>
 *                 </div>
 *             </LayoutContainer >
 *         );
 *     }
 * }
 */

// Export default App;


