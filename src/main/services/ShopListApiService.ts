import {IShopList} from './interfaces/interfaces';
import {ShopListStoreService} from './store/ShopListStoreService';
import {ShopListItemsStoreService} from './store/ShopListItemsStoreService';

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

    async add(item: IShopList):  Promise<IShopList> {
        const newItem = ShopListStoreService.getInstance().add(item);
        return newItem;
    };



    async remove(id: number): Promise<any> {
        let shopListId = id;
        let shopListItemIds;

        const itemToRemove = await ShopListStoreService.getInstance().getById(id);

        if (itemToRemove) {
            /* remove items */
            shopListItemIds = itemToRemove.items;
            await ShopListItemsStoreService.getInstance().removeByIds(shopListItemIds);

            /* remove shopList */
            await ShopListStoreService.getInstance().remove(shopListId);
        }

        return {
            shopListId,
            shopListItemIds
        }


    };

    async update(id: number, data: IShopList) {
        return await ShopListStoreService.getInstance().update(id, data);

    }
}

