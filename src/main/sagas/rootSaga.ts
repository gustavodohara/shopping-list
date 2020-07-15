import {takeLatest, takeEvery } from 'redux-saga/effects';
import {actionIds} from '../actions/actionIds';
import shopListSaga from './shopListSaga';
import storeSaga from './storeSaga';

export default function* rootSaga() {
    // Shop List
    yield takeLatest(actionIds.GET_SHOP_LISTS, shopListSaga.getShopList);
    yield takeLatest(actionIds.CREATE_SHOP_LISTS, shopListSaga.createShopList);
    yield takeLatest(actionIds.REMOVE_SHOP_LISTS, shopListSaga.removeShopList);
    yield takeLatest(actionIds.REMOVE_SHOP_LISTS, shopListSaga.updateShopList);


    // Store
    yield takeLatest(actionIds.GET_STORE_LIST, storeSaga.getStores);
}

