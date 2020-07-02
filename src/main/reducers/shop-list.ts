import {BaseAction} from '../actions/actions';
import {actionIds} from '../actions/actionIds';

const initialState = {
    loading: false,
    errorMessage: null as string,
};

export type ShopListState = Readonly<typeof initialState>;

// reducer
export default (state: ShopListState = initialState, action: BaseAction): ShopListState => {
    switch (action.type) {
        case actionIds.GET_SHOP_LISTS:
        case actionIds.CREATE_SHOP_LISTS:
            return {
                ...state,
                loading: true
            };
        case actionIds.GET_SHOP_LISTS_FAIL:
        case actionIds.CREATE_SHOP_LISTS_FAIL:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case actionIds.GET_SHOP_LISTS_SUCCESS:
        case actionIds.CREATE_SHOP_LISTS_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;

    }

}
