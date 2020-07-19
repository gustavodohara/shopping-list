import {IShopList, IShopListItem, IShopListNormalized} from './interfaces/interfaces';
import {ShopListStoreService} from './store/ShopListStoreService';
import {ShopListItemsStoreService} from './store/ShopListItemsStoreService';
import {ShopListItemsApiService} from './ShopListItemsApiService';

export class ShopListApiService {
    private static instance: ShopListApiService;
    private seq = 0;

    constructor() {
    }

    static getInstance(): ShopListApiService {
        if (!ShopListApiService.instance) {
            ShopListApiService.instance = new ShopListApiService();
            // await ShopListService.instance.init();
        }

        return ShopListApiService.instance;
    }

    // private async init() {
    //     this.seq = await this.getSeq();
    //
    // }

    async get(): Promise<IShopList[]> {
        return await ShopListStoreService.getInstance().get()
    }

    async getById(id: number): Promise<IShopList | null> {
        return ShopListStoreService.getInstance().getById(id);
    }

    async add(item: IShopList): Promise<any> {
        const itemsCreated = await Promise.all(item.items.map(item => {
            return ShopListItemsApiService.getInstance().addOrUpdate(item);
        }));
        const items = itemsCreated ? itemsCreated : [];
        console.log("ShopListApiService", items);
        const itemToCreate = this.buildShopList(item, items);
        const newItem = await ShopListStoreService.getInstance().add(itemToCreate);
        return {
            shopList: newItem,
            shopListItems: items,
        };
    };

    async clone(item: IShopList): Promise<any> {
        const itemsCreated = await Promise.all(item.items.map(item => {
            return ShopListItemsApiService.getInstance().add({...item, is_completed: false});
        }));
        const items = itemsCreated ? itemsCreated : [];
        const itemToCreate = this.buildShopList(item, items);
        const newItem = await ShopListStoreService.getInstance().add(itemToCreate);
        return {
            shopList: newItem,
            shopListItems: items,
        };
    };

    private buildShopList(shopList: IShopList, items: IShopListItem[]): IShopListNormalized {
        const itemIds = items.map(item => item.id);
        const itemToCreate = {
            ...shopList,
            items: itemIds
        };
        return itemToCreate;
    }

    async remove(id: number): Promise<any> {
        let shopListId = id;
        let shopListItemIds;

        const itemToRemove = await ShopListStoreService.getInstance().getById(id);

        if (itemToRemove) {
            /* remove items */
            shopListItemIds = itemToRemove.items;
            if (shopListItemIds) {
                await ShopListItemsStoreService.getInstance().removeByIds(shopListItemIds);
            }

            /* remove shopList */
            await ShopListStoreService.getInstance().remove(shopListId);
        }

        return {
            shopListId,
            shopListItemIds
        }


    };

    private async getItemsIdToRemove(shopListId: number, newItems: IShopListItem[]): Promise<number[]> {
        let itemIdsToRemove: number[] = [];
        debugger
        const oldShopList = await ShopListStoreService.getInstance().getById(shopListId);
        if (oldShopList) {
            const itemIdsToKeep = newItems.map(item => item.id);
            itemIdsToRemove = oldShopList.items.filter(item => !itemIdsToKeep.includes(item.id))
        }
        return itemIdsToRemove;
    }

    async update(id: number, data: IShopList) {
        let shopList = {};
        let shopListItems: IShopListItem[] = [];
        let shopListItemIdsToRemove: number[] = [];
        console.log("shoplistApiService id data", id, data);
        try {
            // remove items
            // shopListItemIdsToRemove = await this.getItemsIdToRemove(id, data.items || []);
            // console.log("shoplistApiService shopListItemIdsToRemove", shopListItemIdsToRemove);
            // await ShopListItemsStoreService.getInstance().removeByIds(shopListItemIdsToRemove);

            // add new items
            shopListItems = await Promise.all(data.items.map(async item => {
                return await ShopListItemsApiService.getInstance().addOrUpdate(item);
            }));
            console.log("shoplistApiService shopListItems", shopListItems);

            const itemIds = data.items.map(item => item.id);
            const shopListToUpdate = {...data, items: itemIds};
            console.log("shoplistApiService shopListToUpdate", shopListToUpdate);
            shopList = await ShopListStoreService.getInstance().update(id, shopListToUpdate);
            return {
                shopList,
                shopListItems,
                shopListItemIdsToRemove,
            }
        } catch (e) {
            return {
                shopList,
                shopListItems,
                shopListItemIdsToRemove,
            }
        }
    }


    async cleanAll() {
        await ShopListStoreService.getInstance().cleanAll();
        await ShopListItemsStoreService.getInstance().cleanAll();
    }
}

