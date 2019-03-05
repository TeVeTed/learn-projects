import * as constants from '../constants';

export interface Payload {
	item: string;
	closed: boolean;
}

export interface AddItem {
	type: constants.ADD_ITEM;
	payload: Payload;
}

export interface RemoveItem {
	type: constants.REMOVE_ITEM;
	index: number;
}

export interface RevertClosing {
	type: constants.REVERT_CLOSING;
	index: number;
}

export type ItemAction = AddItem | RemoveItem | RevertClosing;

export function addItem(payload: Payload): AddItem {
	return {
		type: constants.ADD_ITEM,
		payload
	};
}

export function removeItem(index: number): RemoveItem {
	return {
		type: constants.REMOVE_ITEM,
		index
	}
}

export function revertClosing(index: number): RevertClosing {
	return {
		type: constants.REVERT_CLOSING,
		index
	}
}