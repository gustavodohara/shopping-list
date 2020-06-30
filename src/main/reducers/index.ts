import {combineReducers} from 'redux';
import main, {MainState} from './main';
import shopList, {ShopListState} from './shop-list';

export interface IRootState {
    readonly main: MainState;
    readonly shopList: ShopListState;
}

const rootReducer = combineReducers<IRootState>({
    main,
    shopList
});

export default rootReducer;
