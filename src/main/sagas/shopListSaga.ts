import {all, call, put} from 'redux-saga/effects';
import {ShopListApiService} from '../services/ShopListApiService';
import {
    createShopListsFailAction,
    createShopListsSuccessAction,
    getShopListsFailAction,
    getShopListsSuccessAction, removeShopListsSuccessAction, updateShopListsFailAction, updateShopListsSuccessAction
} from '../actions/shop-list';
import {deleteNormalizedAction, upsertNormalizedAction} from '../actions/actions';
import {normalizeItem, shopListSchema} from '../config/normalization';
import {actionIds} from '../actions/actionIds';
import {SCHEMA_SHOP_LIST_ITEMS_KEY, SCHEMA_SHOP_LIST_KEY} from '../config/constants';
import {IShopList} from '../services/interfaces/interfaces';

async function getShopListAPI() {
    try {
        return await ShopListApiService.getInstance().get();
    } catch (e) {
        return e
    }
}

async function createShopListAPI(data: IShopList) {
    try {
        return await ShopListApiService.getInstance().add(data);
    } catch (e) {
        return e
    }
}

async function removeShopListAPI(data: number) {
    try {
        return await ShopListApiService.getInstance().remove(data);
    } catch (e) {
        return e
    }
}

async function editShopListAPI(id: number, data: IShopList) {
    try {
        return await ShopListApiService.getInstance().update(id, data);
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

    removeShopList: function* (action: any) {
        let success = false;
        let response;
        try {
            const data = action.payload;
            response = yield call(removeShopListAPI, data);

            const {shopListId, shopListItemIds} = response;
            const shopListKeyToRemove = [shopListId];
            yield all([
                put(deleteNormalizedAction(actionIds.GET_SHOP_LISTS_NORMALIZED, [
                        { entities: SCHEMA_SHOP_LIST_KEY, ids: [shopListKeyToRemove] },
                    ])),
                put(deleteNormalizedAction(actionIds.GET_SHOP_LISTS_NORMALIZED, [
                    { entities: SCHEMA_SHOP_LIST_ITEMS_KEY, ids: shopListItemIds },
                ])),
                put(removeShopListsSuccessAction(shopListId)),
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

    updateShopList: function* (action: any) {
        let success = false;
        let response;
        try {
            const data = action.payload;
            const {id} = data;
            response = yield call(editShopListAPI, id, data);

            const updatedShopList = response;
            yield all([
                put(upsertNormalizedAction(actionIds.GET_SHOP_LISTS_NORMALIZED, normalizeItem(updatedShopList, shopListSchema))),
                put(updateShopListsSuccessAction(updatedShopList)),
            ]);
            success = true;
            if (action.onSuccess) {
                action.onSuccess(response);
            }
        } catch (e) {
            console.log(e);
            yield put(updateShopListsFailAction(e));
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
