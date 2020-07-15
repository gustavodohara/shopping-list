
export interface IShopList {
    /* id in collections */
    id?: number;
    /* name of list */
    name: string;
    /* date */
    date: Date;
    /* id in store collection */
    store: number;
    /* array of items in items collection */
    items: number[]
}

export interface IShopListItem {
    /* id in collections */
    id?: number;
    /* name of list */
    name: string;
    /* quantity */
    qty: number
    /* id in store collection */
    unit: number;
}

export interface IStore {
    /* id in collections */
    id?: number;
    /* name of list */
    name: string;
    /* description of the store */
    description: string;
}

export interface IUnit {
    /* id in collections */
    id?: number;
    /* name of units */
    name: string;
}

