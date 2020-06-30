import {normalize, Schema, schema} from "normalizr";

import {SCHEMA_SHOP_LIST_KEY} from './constants';

export const shopListSchema = new schema.Entity(SCHEMA_SHOP_LIST_KEY);


export const normalizeItem = (data: any, schema: Schema<any>) => {
    return normalize(data, schema)
};
