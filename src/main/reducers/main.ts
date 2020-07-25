import _ from "lodash";
import {BaseAction} from '../actions/actions';
import {IShopList, IShopListItem, IStore} from '../services/interfaces/interfaces';

export interface MainState {
  shopLists: {[key: string]: IShopList};
  shopListItems: {[key: string]: IShopListItem};
  stores: {[key: string]: IStore};
}

const initialState: MainState = {
  shopLists: {},
  stores: {},
};

export interface IKeyValue {
  readonly key: string;
  readonly value: any;
}

export default (state = initialState, action: BaseAction): MainState => {
  if (action && (action.normalized || action.removeKeys || action.setKeys || action.deep_normalized)) {
    if (action.deep_normalized) {
      Object.keys(action.deep_normalized.entities).forEach(function(key) {
        Object.keys(action.deep_normalized.entities[key]).forEach(o => {
          let object = { ...action.deep_normalized.entities[key][o] };
          if (state[key] && state[key][o]) {
            object = {
              ...state[key][o],
              ...action.deep_normalized.entities[key][o]
            };
          }
          state[key][o] = object;
        });
      });
    }

    if (action.normalized) {
      Object.keys(action.normalized.entities).forEach(function(key) {
        state[key] = {
          ...state[key],
          ...action.normalized.entities[key]
        };
      });
    }

    if (action.removeKeys) {
      // the redux store entities object we are removing a key from
      for (let i = 0; i < action.removeKeys.length; i++) {
        state[action.removeKeys[i].entities] = _.omit(
          state[action.removeKeys[i].entities],
          action.removeKeys[i].ids
        );
      }
    }

    if (action.setKeys) {
      action.setKeys.forEach((keyVal: IKeyValue) => {
        state[keyVal.key] = keyVal.value;
      });
    }
    return { ...state };
  } else {
    return state;
  }
};
