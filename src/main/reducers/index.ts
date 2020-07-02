import {combineReducers} from 'redux';
import main, {MainState} from './main';
import shopList, {ShopListState} from './shop-list';
import store, {StoreState} from './store';

export interface IRootState {
    readonly main: MainState;
    readonly shopList: ShopListState;
    readonly store: StoreState;
}

const rootReducer = combineReducers<IRootState>({
    main,
    shopList,
    store,
});

export default rootReducer;
