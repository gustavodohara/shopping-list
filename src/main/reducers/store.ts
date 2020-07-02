import {BaseAction} from '../actions/actions';
import {actionIds} from '../actions/actionIds';

const initialState = {
    loading: false,
    errorMessage: null as string,
};

export type StoreState = Readonly<typeof initialState>;

// reducer
export default (state: ShopListState = initialState, action: BaseAction): StoreState => {
    switch (action.type) {
        case actionIds.GET_STORE_LIST:
            return {
                ...state,
                loading: true
            };
        case actionIds.GET_STORE_LIST_FAIL:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case actionIds.GET_STORE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;

    }

}
