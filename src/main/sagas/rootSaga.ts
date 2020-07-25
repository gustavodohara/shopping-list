import {takeLatest, takeEvery } from 'redux-saga/effects';
import {actionIds} from '../actions/actionIds';
import shopListSaga from './shopListSaga';
import storeSaga from './storeSaga';
import shopListItemSaga from './shopListItemSaga';

export default function* rootSaga() {
    // Shop List
    yield takeLatest(actionIds.GET_SHOP_LISTS, shopListSaga.getShopList);
    yield takeLatest(actionIds.CREATE_SHOP_LISTS, shopListSaga.createShopList);
    yield takeLatest(actionIds.REMOVE_SHOP_LISTS, shopListSaga.removeShopList);
    yield takeLatest(actionIds.UPDATE_SHOP_LISTS, shopListSaga.updateShopList);
    yield takeLatest(actionIds.CLEAN_SHOP_LISTS, shopListSaga.cleanAllShopList);
    yield takeLatest(actionIds.CLONE_SHOP_LISTS, shopListSaga.cloneShopList);

    // Shop List
    yield takeLatest(actionIds.GET_SHOP_LIST_ITEMS, shopListItemSaga.getShopListItems);
    yield takeLatest(actionIds.UPDATE_SHOP_LIST_ITEMS, shopListItemSaga.updateShopListItems);
    yield takeLatest(actionIds.UPDATE_SHOP_LIST_ITEMS, shopListItemSaga.updateShopListItems);


    // Store
    yield takeLatest(actionIds.GET_STORE_LIST, storeSaga.getStores);
}

