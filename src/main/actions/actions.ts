/**
 * type: type of action
 * payload: payload of action
 * normalized (optional): indicate a action must be normalized before handle it (add)
 * removeKeys (optional): indicate a action must be normalized before handle it (remove)
 * setkeys (optional): indicate a action must be normalized before handle it (update)
 */
export interface BaseAction {
  type: string;
  payload?: any;
  normalized?: any;
  deep_normalized?: any;
  removeKeys?: any;
  setKeys?: any;
}

export interface IKeyValue {
  readonly key: string;
  readonly value: any;
}

export const upsertNormalizedAction: (type, normalized) => BaseAction = (type, normalized) => ({
  type: type,
  normalized: normalized,
  onSuccess: null,
  onFail: null
});

export const upsertDeepNormalizedAction: (type, deep_normalized) => BaseAction = (type, deep_normalized) => ({
  type: type,
  deep_normalized: deep_normalized,
  onSuccess: null,
  onFail: null
});

export const setNormalizedAction: (type, data: IKeyValue[]) => BaseAction = (type, data) => ({
  type: type,
  setKeys: data,
  onSuccess: null,
  onFail: null
});

export const deleteNormalizedAction: (type, data) => BaseAction = (type, data) => ({
  type: type,
  removeKeys: data,
  onSuccess: null,
  onFail: null
});
