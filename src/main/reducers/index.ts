import {combineReducers} from 'redux';
import test, {TestState} from './test';

export interface IRootState {
    readonly test: TestState;
}

const rootReducer = combineReducers<IRootState>({
    test,
});

export default rootReducer;
