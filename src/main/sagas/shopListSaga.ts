import {all, call, put} from 'redux-saga/effects';
import {ShopListService} from '../services/ShopListService';
import {
    createShopListsFailAction,
    createShopListsSuccessAction,
    getShopListsFailAction,
    getShopListsSuccessAction
} from '../actions/shopList';
import {upsertNormalizedAction} from '../actions/actions';
import {normalizeItem, shopListSchema} from '../config/normalization';
import {actionIds} from '../actions/actionIds';

async function getShopListAPI() {
    try {
        return await ShopListService.getInstance().get();
    } catch (e) {
        return e
    }
}

async function createShopListAPI(data) {
    try {
        return await ShopListService.getInstance().add(data);
    } catch (e) {
        return e
    }
}

const shopListSaga = {
    getShopList: function* (action: any) {
        let success = false;
        let response;
        try {
            response = yield call(getShopListAPI);

            // console.log('shoplistsage response', response);
            yield all([
                put(upsertNormalizedAction(actionIds.GET_SHOP_LISTS_NORMALIZED, normalizeItem(response, [shopListSchema]))),
                put(getShopListsSuccessAction(response)),
            ]);
            success = true;
            if (action.onSuccess) {
                action.onSuccess(response);
            }
        } catch (e) {
            console.log(e);
            yield put(getShopListsFailAction(e));
        }

        if (!success) {
            // if (action.onFail) {
            //     action.onFail()
            // }
            // yield put(getShopListsFailAction(failData));
        }
    },

    createShopList: function* (action: any) {
        let success = false;
        let response;
        try {
            const data = action.payload;
            response = yield call(createShopListAPI, data);

            const newShopList = response;
            yield all([
                put(upsertNormalizedAction(actionIds.GET_SHOP_LISTS_NORMALIZED, normalizeItem(newShopList, shopListSchema))),
                put(createShopListsSuccessAction(newShopList)),
            ]);
            success = true;
            if (action.onSuccess) {
                action.onSuccess(response);
            }
        } catch (e) {
            console.log(e);
            yield put(createShopListsFailAction(e));
        }

        if (!success) {
            // if (action.onFail) {
            //     action.onFail()
            // }
            // yield put(getShopListsFailAction(failData));
        }
    },
};

export default shopListSaga;
