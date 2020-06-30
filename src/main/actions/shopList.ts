import {actionIds} from './actionIds';
import {BaseAction} from './actions';

/**
 * load agenda events for student
 */
export const getShopListsAction: (onSuccess, onFail) => BaseAction = (onSuccess, onFail) => ({
    type: actionIds.GET_SHOP_LISTS,
    payload: null,
    onSuccess: onSuccess || null,
    onFail: onFail || null
});

/**
 * load agenda events success for student
 */
export const getShopListsSuccessAction: (data: any) => BaseAction = (data) => ({
    type: actionIds.GET_SHOP_LISTS_SUCCESS,
    payload: data
});

/**
 * load agenda events fail for student
 * @param error
 */
export const getShopListsFailAction: (error: any) => BaseAction = (error) => ({
    type: actionIds.GET_SHOP_LISTS_FAIL,
    payload: error
});
