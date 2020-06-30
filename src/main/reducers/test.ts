import {BaseAction} from '../actions/actions';
import {REQUEST} from './action-type.util';
import {actionIds} from '../actions/actionIds';

const initialState = {
    test: {}
};

export type TestState = Readonly<typeof initialState>;

// reducer
export default (state: TestState = initialState, action: BaseAction): TestState => {
    switch (action.type) {
        case actionIds.TEST_ACTION:
            return state;
        default:
            return state;

    }

}
