import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Routes from '/src/Routes';
import Store from '/src/Redux/Store'

const App = () => {

    return (
            <Provider store={Store}>
                <Routes />
            </Provider>
    );
};


ReactDOM.render(<App />, document.getElementById('app'));


