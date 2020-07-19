import {all, call, put} from 'redux-saga/effects';
import {ShopListApiService} from '../services/ShopListApiService';
import {
    cleanAllShopListsFailAction,
    cleanAllShopListsSuccessAction,
    createShopListsFailAction,
    createShopListsSuccessAction,
    getShopListsFailAction,
    getShopListsSuccessAction, removeShopListsSuccessAction, updateShopListsFailAction, updateShopListsSuccessAction
} from '../actions/shop-list';
import {deleteNormalizedAction, upsertNormalizedAction} from '../actions/actions';
import {normalizeItem, shopListItemsSchema, shopListSchema} from '../config/normalization';
import {actionIds} from '../actions/actionIds';
import {SCHEMA_SHOP_LIST_ITEMS_KEY, SCHEMA_SHOP_LIST_KEY} from '../config/constants';
import {IShopList, IShopListItem} from '../services/interfaces/interfaces';
import {logL} from '../utils/logs/logs';
import {ShopListItemsApiService} from '../services/ShopListItemsApiService';
import {updateShopListItemsSuccessAction} from '../actions/shop-list-item';

async function getShopListItemsAPI() {
    try {
        return await ShopListItemsApiService.getInstance().getAll();
    } catch (e) {
        return e
    }
}

async function updateShopListItemAPI(id: number, data: IShopListItem) {
    try {
        return await ShopListItemsApiService.getInstance().update(id, data);
    } catch (e) {
        return e
    }
}

const shopListItemSaga = {
    getShopListItems: function* (action: any) {
        let success = false;
        let response;
        try {
            response = yield call(getShopListItemsAPI);

            // console.log('shopListItemSaga getShopListItems response', response);
            yield all([
                put(upsertNormalizedAction(actionIds.SHOP_LIST_ITEMS_NORMALIZED, normalizeItem(response, [shopListItemsSchema]))),
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

    updateShopListItems: function* (action: any) {
        let success = false;
        let response;
        try {
            const data = action.payload;
            const {id} = data;
            response = yield call(updateShopListItemAPI, id, data);

            console.log('shopListItemSaga updateShopListItems response', response);
            yield all([
                put(upsertNormalizedAction(actionIds.SHOP_LIST_ITEMS_NORMALIZED, normalizeItem(response, shopListItemsSchema))),
                put(updateShopListItemsSuccessAction(response)),
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
};

export default shopListItemSaga;
