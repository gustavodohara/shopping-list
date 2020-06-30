import React from 'react';
import { Provider } from 'react-redux';
import Navigator from './src/main/navigations/';

import initializeReduxStorage from './src/main/config/store'
// init redux storage
const store = initializeReduxStorage();


export default function App() {
    return (
        <Provider store={store}>
            <Navigator/>
        </Provider>
    );
}

