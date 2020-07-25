import {actionIds} from './actionIds';
import {BaseAction} from './actions';

/**
 * load shop list
 */
export const getShopListItemsAction: (onSuccess, onFail) => BaseAction = (onSuccess, onFail) => ({
    type: actionIds.GET_SHOP_LIST_ITEMS,
    payload: null,
    onSuccess: onSuccess || null,
    onFail: onFail || null
});

/**
 * load shop list success
 */
export const getShopListItemsSuccessAction: (data: any) => BaseAction = (data) => ({
    type: actionIds.GET_SHOP_LIST_ITEMS_SUCCESS,
    payload: data
});

/**
 * load shop list fail
 * @param error
 */
export const getShopListItemsFailAction: (error: any) => BaseAction = (error) => ({
    type: actionIds.GET_SHOP_LIST_ITEMS_FAIL,
    payload: error
});

/**
 * load shop list
 */
export const updateShopListItemsAction: (data, onSuccess, onFail) => BaseAction = (data, onSuccess, onFail) => ({
    type: actionIds.UPDATE_SHOP_LIST_ITEMS,
    payload: data,
    onSuccess: onSuccess || null,
    onFail: onFail || null
});

/**
 * load shop list success
 */
export const updateShopListItemsSuccessAction: (data: any) => BaseAction = (data) => ({
    type: actionIds.UPDATE_SHOP_LIST_ITEMS_SUCCESS,
    payload: data
});

/**
 * load shop list fail
 * @param error
 */
export const updateShopListItemsFailAction: (error: any) => BaseAction = (error) => ({
    type: actionIds.UPDATE_SHOP_LIST_ITEMS_FAIL,
    payload: error
});
