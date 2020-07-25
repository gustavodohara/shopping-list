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
import {IShopList} from '../services/interfaces/interfaces';
import {logL} from '../utils/logs/logs';

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

async function cleanAllShopListAPI() {
    try {
        return await ShopListApiService.getInstance().cleanAll();
    } catch (e) {
        return e
    }
}

async function cloneShopListAPI(data: IShopList) {
    try {
        return await ShopListApiService.getInstance().clone(data);
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
            const {shopList, shopListItems} = response;
            yield all([
                put(upsertNormalizedAction(actionIds.GET_SHOP_LISTS_NORMALIZED, normalizeItem(shopList, shopListSchema))),
                put(upsertNormalizedAction(actionIds.SHOP_LIST_ITEMS_NORMALIZED, normalizeItem(shopListItems, [shopListItemsSchema]))),
                put(createShopListsSuccessAction(shopList)),
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
            // console.log("removeShopList shopListId", shopListId);
            // console.log("removeShopList shopListItemIds", shopListItemIds);
            const shopListKeyToRemove = [shopListId];
            yield all([
                put(deleteNormalizedAction(actionIds.GET_SHOP_LISTS_NORMALIZED, [
                    {entities: SCHEMA_SHOP_LIST_KEY, ids: shopListKeyToRemove},
                ])),
                put(deleteNormalizedAction(actionIds.GET_SHOP_LISTS_NORMALIZED, [
                    {entities: SCHEMA_SHOP_LIST_ITEMS_KEY, ids: shopListItemIds},
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
            const {
                shopList,
                shopListItems,
                shopListItemIdsToRemove,
            } = response;
            yield all([
                put(upsertNormalizedAction(actionIds.GET_SHOP_LISTS_NORMALIZED, normalizeItem(shopList, shopListSchema))),
                put(upsertNormalizedAction(actionIds.SHOP_LIST_ITEMS_NORMALIZED, normalizeItem(shopListItems, [shopListItemsSchema]))),
                put(deleteNormalizedAction(actionIds.SHOP_LIST_ITEMS_NORMALIZED, [
                    {entities: SCHEMA_SHOP_LIST_ITEMS_KEY, ids: [shopListItemIdsToRemove]},
                ])),
                put(updateShopListsSuccessAction(shopList)),
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

    cleanAllShopList: function* (action: any) {
        let success = false;
        let response;
        try {
            response = yield call(cleanAllShopListAPI);

            const updatedShopList = response;
            yield all([
                // put(upsertNormalizedAction(actionIds.GET_SHOP_LISTS_NORMALIZED, normalizeItem(updatedShopList, shopListSchema))),
                put(cleanAllShopListsSuccessAction(updatedShopList)),
            ]);
            success = true;
            if (action.onSuccess) {
                action.onSuccess(response);
            }
        } catch (e) {
            console.log(e);
            yield put(cleanAllShopListsFailAction(e));
        }

        if (!success) {
            // if (action.onFail) {
            //     action.onFail()
            // }
            // yield put(getShopListsFailAction(failData));
        }
    },

    cloneShopList: function* (action: any) {
        let success = false;
        let response;
        try {
            const data = action.payload;
            response = yield call(cloneShopListAPI, data);
            const {shopList, shopListItems} = response;
            yield all([
                put(upsertNormalizedAction(actionIds.GET_SHOP_LISTS_NORMALIZED, normalizeItem(shopList, shopListSchema))),
                put(upsertNormalizedAction(actionIds.SHOP_LIST_ITEMS_NORMALIZED, normalizeItem(shopListItems, [shopListItemsSchema]))),
                put(createShopListsSuccessAction(shopList)),
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
