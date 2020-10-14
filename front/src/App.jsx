import React, {Component} from 'react';
import logo from './assets/images/xlBurger1.jpeg';


class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    Ptite démo pour les potos
                </p>
            </div>

        );
    }
}

export default App;


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


