import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';
import reducer, {IRootState} from '../reducers';
// import errorMiddleware from './error-middleware';
// import notificationMiddleware from './notification-middleware';
import loggerMiddleware from './logger-middleware';
import rootSaga from '../sagas/rootSaga';

/**
 * saga middleware
 */
const sagaMiddleware = createSagaMiddleware();

const defaultMiddlewares = [
    // errorMiddleware,
    // notificationMiddleware,
    promise,
    loggerMiddleware,
    sagaMiddleware
];
const composedMiddlewares = (middlewares: any[]) =>
    compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState?: IRootState, middlewares = []) => {
    const store = createStore(
        reducer,
        initialState,
        composeWithDevTools(composedMiddlewares(middlewares))
    );
    sagaMiddleware.run(rootSaga);

    return store;
};

export default initialize;
