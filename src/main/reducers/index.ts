import {combineReducers} from 'redux';
import main, {MainState} from './main';
import shopList, {ShopListState} from './shop-list';
import store, {StoreState} from './store';
import shopListItems, {ShopListItemsState} from './shop-list-items';

export interface IRootState {
    readonly main: MainState;
    readonly shopList: ShopListState;
    readonly shopListItems: ShopListItemsState;
    readonly store: StoreState;
}

const rootReducer = combineReducers<IRootState>({
    main,
    shopList,
    shopListItems,
    store,
});

export default rootReducer;
