import {actionIds} from './actionIds';
import {BaseAction} from './actions';

/**
 * load shop list
 */
export const getShopListsAction: (onSuccess, onFail) => BaseAction = (onSuccess, onFail) => ({
    type: actionIds.GET_SHOP_LISTS,
    payload: null,
    onSuccess: onSuccess || null,
    onFail: onFail || null
});

/**
 * load shop list success
 */
export const getShopListsSuccessAction: (data: any) => BaseAction = (data) => ({
    type: actionIds.GET_SHOP_LISTS_SUCCESS,
    payload: data
});

/**
 * load shop list fail
 * @param error
 */
export const getShopListsFailAction: (error: any) => BaseAction = (error) => ({
    type: actionIds.GET_SHOP_LISTS_FAIL,
    payload: error
});



/**
 * create shop list
 */
export const createShopListsAction: (data, onSuccess, onFail) => BaseAction = (data, onSuccess, onFail) => ({
    type: actionIds.CREATE_SHOP_LISTS,
    payload: data,
    onSuccess: onSuccess || null,
    onFail: onFail || null
});

/**
 * load shop list success
 */
export const createShopListsSuccessAction: (data: any) => BaseAction = (data) => ({
    type: actionIds.CREATE_SHOP_LISTS_SUCCESS,
    payload: data
});

/**
 * load shop list fail
 * @param error
 */
export const createShopListsFailAction: (error: any) => BaseAction = (error) => ({
    type: actionIds.CREATE_SHOP_LISTS_FAIL,
    payload: error
});

/**
 * remove shop list
 */
export const removeShopListsAction: (data, onSuccess, onFail) => BaseAction = (data, onSuccess, onFail) => ({
    type: actionIds.REMOVE_SHOP_LISTS,
    payload: data,
    onSuccess: onSuccess || null,
    onFail: onFail || null
});

/**
 * remove shop list success
 */
export const removeShopListsSuccessAction: (data: any) => BaseAction = (data) => ({
    type: actionIds.REMOVE_SHOP_LISTS_SUCCESS,
    payload: data
});

/**
 * remove shop list fail
 * @param error
 */
export const removeShopListsFailAction: (error: any) => BaseAction = (error) => ({
    type: actionIds.REMOVE_SHOP_LISTS_FAIL,
    payload: error
});


/**
 * update shop list
 */
export const updateShopListsAction: (data, onSuccess, onFail) => BaseAction = (data, onSuccess, onFail) => ({
    type: actionIds.UPDATE_SHOP_LISTS,
    payload: data,
    onSuccess: onSuccess || null,
    onFail: onFail || null
});

/**
 * update shop list success
 */
export const updateShopListsSuccessAction: (data: any) => BaseAction = (data) => ({
    type: actionIds.UPDATE_SHOP_LISTS_SUCCESS,
    payload: data
});

/**
 * update shop list fail
 * @param error
 */
export const updateShopListsFailAction: (error: any) => BaseAction = (error) => ({
    type: actionIds.UPDATE_SHOP_LISTS_FAIL,
    payload: error
});


/**
 * clean all shop list
 */
export const cleanAllShopListsAction: () => BaseAction = () => ({
    type: actionIds.CLEAN_SHOP_LISTS,
    payload: null,
    onSuccess: null,
    onFail: null
});

/**
 * clean all shop list success
 */
export const cleanAllShopListsSuccessAction: (data: any) => BaseAction = (data) => ({
    type: actionIds.CLEAN_SHOP_LISTS_SUCCESS,
    payload: data
});

/**
 * clean all shop list fail
 * @param error
 */
export const cleanAllShopListsFailAction: (error: any) => BaseAction = (error) => ({
    type: actionIds.CLEAN_SHOP_LISTS_FAIL,
    payload: error
});


/**
 * create shop list
 */
export const cloneShopListsAction: (data, onSuccess, onFail) => BaseAction = (data, onSuccess, onFail) => ({
    type: actionIds.CLONE_SHOP_LISTS,
    payload: data,
    onSuccess: onSuccess || null,
    onFail: onFail || null
});

/**
 * load shop list success
 */
export const cloneShopListsSuccessAction: (data: any) => BaseAction = (data) => ({
    type: actionIds.CLONE_SHOP_LISTS_SUCCESS,
    payload: data
});

/**
 * load shop list fail
 * @param error
 */
export const cloneShopListsFailAction: (error: any) => BaseAction = (error) => ({
    type: actionIds.CLONE_SHOP_LISTS_FAIL,
    payload: error
});
