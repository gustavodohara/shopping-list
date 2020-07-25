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
        // we execute promises in sequenceq to not break the sequence
        const itemsCreated: IShopListItem[] = [];
        for (const element of item.items) {
            const newItem = await ShopListItemsApiService.getInstance().addOrUpdate(element);
            itemsCreated.push(newItem);
        }

        const itemToCreate = this.buildShopList(item, itemsCreated);
        const newItem = await ShopListStoreService.getInstance().add(itemToCreate);
        return {
            shopList: newItem,
            shopListItems: itemsCreated,
        };
    };

    async clone(item: IShopList): Promise<any> {
        const itemsCloned = [];

        for (const id of item.items) {
            const findedElement = await ShopListItemsApiService.getInstance().get(id);
            if (findedElement) {
                const newElement = await ShopListItemsApiService.getInstance().add({
                    ...findedElement,
                    is_completed: false
                });
                itemsCloned.push(newElement);
            }
        }
        ;

        const itemToCreate = this.buildShopList(item, itemsCloned);
        const cloneShoppingList = await ShopListStoreService.getInstance().add(itemToCreate);
        console.log("ShopListApiService itemCloned", itemsCloned);
        console.log("ShopListApiService itemToCreate", itemToCreate);
        console.log("ShopListApiService itemCloned", cloneShoppingList);

        return {
            shopList: cloneShoppingList,
            shopListItems: itemsCloned,
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
        try {
            // remove items
            // shopListItemIdsToRemove = await this.getItemsIdToRemove(id, data.items || []);
            // console.log("shoplistApiService shopListItemIdsToRemove", shopListItemIdsToRemove);
            // await ShopListItemsStoreService.getInstance().removeByIds(shopListItemIdsToRemove);

            // add new items
            shopListItems = await ShopListItemsApiService.getInstance().addOrUpdateAll([...data.items]);

            const shopListItemFiltered = shopListItems.filter(item => !!item);

            const itemIds = data.items.map(item => item.id);
            const shopListToUpdate = {...data, items: itemIds};
            shopList = await ShopListStoreService.getInstance().update(id, shopListToUpdate);
            return {
                shopList,
                shopListItems: shopListItemFiltered,
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

