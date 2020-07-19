import {BaseAction} from '../actions/actions';
import {actionIds} from '../actions/actionIds';

const initialState = {
    loading: false,
    errorMessage: null as string,
};

export type ShopListItemsState = Readonly<typeof initialState>;

// reducer
export default (state: ShopListItemsState = initialState, action: BaseAction): ShopListItemsState => {
    switch (action.type) {
        case actionIds.GET_SHOP_LIST_ITEMS:
            return {
                ...state,
                loading: true
            };
        case actionIds.GET_SHOP_LIST_ITEMS_FAIL:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case actionIds.GET_SHOP_LIST_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;

    }

}
