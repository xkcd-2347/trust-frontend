import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

const initialState = {
  inventory: [],
};

export const loadInventory = (): ThunkAction<any, any, any, AnyAction> => {
  return async (dispatch: any) => {
    const items = await fetch('/api/trusted');
    const jsonItems = await items.json();

    dispatch(setInventory(jsonItems));
  };
};

export const setInventory = (items: object) => {
  return {
    type: 'trust/inventory',
    items: items,
  };
};

export function inventoryReducer(state = initialState, action: AnyAction) {
  if (action.type == 'trust/inventory') {
    return {
      ...state,
      inventory: action.items,
    };
  } else {
    return state;
  }
}

export function selectInventory(state: any) {
  return state.trusted_inventory.inventory;
}