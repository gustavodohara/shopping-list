import {ShopListItemsStoreService} from './store/ShopListItemsStoreService';
import {IShopListItem} from './interfaces/interfaces';

export class ShopListItemsApiService {
    private static instance: ShopListItemsApiService;
    private seq = 0;

    constructor() {
    }

    static getInstance(): ShopListItemsApiService {
        if (!ShopListItemsApiService.instance) {
            ShopListItemsApiService.instance = new ShopListItemsApiService();
            // await ShopListService.instance.init();
        }

        return ShopListItemsApiService.instance;
    }

    // private async init() {
    //     this.seq = await this.getSeq();
    //
    // }

    async get(id: number): Promise<IShopListItem | null> {
        const shopListItem = await ShopListItemsStoreService.getInstance().get(id);
        return shopListItem;
    }

    async getByIds(ids: number[]): Promise<IShopListItem[]> {
        const shopListItems = await ShopListItemsStoreService.getInstance().getByIds(ids);
        return shopListItems;
    }

    async getAll(): Promise<IShopListItem[]> {
        const list: IShopListItem[] = await ShopListItemsStoreService.getInstance().getAll();
        return list;
    }

    async add(item: IShopListItem) {
        const newItem = await ShopListItemsStoreService.getInstance().add(item);
        return newItem;
    };

    async remove(id: number) {
        await ShopListItemsStoreService.getInstance().remove(id);
        return id;
    };

    async removeByIds(ids: number[]) {
        await ShopListItemsStoreService.getInstance().removeByIds(ids);
        return ids;
    };

    async update(id: number, data: IShopListItem) {
        return await ShopListItemsStoreService.getInstance().update(id, data);

    }
}

