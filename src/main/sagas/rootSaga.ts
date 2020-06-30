import {takeLatest, takeEvery } from 'redux-saga/effects';
import {actionIds} from '../actions/actionIds';
import shopListSaga from './shopListSaga';

export default function* rootSaga() {
    // Register
    yield takeLatest(actionIds.GET_SHOP_LISTS, shopListSaga.getShopList);
}

