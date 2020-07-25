import {BaseAction} from './actions';
import {actionIds} from './actionIds';

/**
 * load shop list
 */
export const getStoreAction: (onSuccess, onFail) => BaseAction = (onSuccess, onFail) => ({
    type: actionIds.GET_STORE_LIST,
    payload: null,
    onSuccess: onSuccess || null,
    onFail: onFail || null
});

/**
 * load shop list success
 */
export const getStoreSuccessAction: (data: any) => BaseAction = (data) => ({
    type: actionIds.GET_STORE_LIST_SUCCESS,
    payload: data
});

/**
 * load shop list fail
 * @param error
 */
export const getStoreFailAction: (error: any) => BaseAction = (error) => ({
    type: actionIds.GET_STORE_LIST_FAIL,
    payload: error
});
