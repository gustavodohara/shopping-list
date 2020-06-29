import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import promiseMiddleware from 'redux-promise-middleware';
import reducer, { IRootState } from '../reducers';
// import errorMiddleware from './error-middleware';
// import notificationMiddleware from './notification-middleware';
import loggerMiddleware from './logger-middleware';

const defaultMiddlewares = [
    // errorMiddleware,
    // notificationMiddleware,
    // promiseMiddleware(),
    loggerMiddleware
];
const composedMiddlewares = middlewares =>
    compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState?: IRootState, middlewares = []) =>
    createStore(reducer, initialState, composeWithDevTools(composedMiddlewares(middlewares)));

export default initialize;
