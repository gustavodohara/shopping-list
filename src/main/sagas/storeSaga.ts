import {all, call, put} from 'redux-saga/effects';
import {upsertNormalizedAction} from '../actions/actions';
import {normalizeItem, shopListSchema, storeSchema} from '../config/normalization';
import {actionIds} from '../actions/actionIds';
import {StoresApiService} from '../services/StoresApiService';
import {getStoreFailAction, getStoreSuccessAction} from '../actions/store';

async function getStoresAPI() {
    try {
        return await StoresApiService.getInstance().get();
    } catch (e) {
        return e
    }
}

const storeSaga = {
    getStores: function* (action: any) {
        let success = false;
        let response;
        try {
            response = yield call(getStoresAPI);

            yield all([
                put(upsertNormalizedAction(actionIds.GET_STORE_LIST_NORMALIZED, normalizeItem(response, [storeSchema]))),
                put(getStoreSuccessAction(response)),
            ]);
            success = true;
            if (action.onSuccess) {
                action.onSuccess(response);
            }
        } catch (e) {
            console.log(e);
            yield put(getStoreFailAction(e));
        }

        if (!success) {
            // if (action.onFail) {
            //     action.onFail()
            // }
            // yield put(getShopListsFailAction(failData));
        }
    },
};

export default storeSaga;
