import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

import Navigator from './src/main/navigations/';
import initializeReduxStorage from './src/main/config/store'
import theme from './src/main/styles/theme';
// init redux storage
const store = initializeReduxStorage();


export default function App() {
    return (
        <PaperProvider theme={theme}>
            <Provider store={store}>
                <Navigator/>
            </Provider>
        </PaperProvider>
    );
}

