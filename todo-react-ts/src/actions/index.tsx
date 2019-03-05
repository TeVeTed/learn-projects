import * as constants from '../constants';

export interface AddItem {
    type: constants.ADD_ITEM;
    payload: object;
}

export interface RemoveItem {
    type: constants.REMOVE_ITEM;
    payload: object;
}

export type ItemAction = AddItem | RemoveItem;

export function addItem(payload): AddItem {
    return {
        type: constants.ADD_ITEM,
        payload
    };
}

export function removeItem(payload): RemoveItem {
    return {
        type: constants.REMOVE_ITEM,
        payload
    }
}