import {incrementSeqItems, ShopListItemsStoreService} from './store/ShopListItemsStoreService';
import {IShopListItem} from './interfaces/interfaces';

export class ShopListItemsApiService {
    private static instance: ShopListItemsApiService;
    private seq = 0;

    constructor() {
        this.get.bind(this);
        this.getByIds.bind(this);
        this.getAll.bind(this);
        this.add.bind(this);
        this.addOrUpdate.bind(this);
        this.addOrUpdateAll.bind(this);
        this.remove.bind(this);
        this.removeByIds.bind(this);
        this.update.bind(this);
        this.cleanAll.bind(this);

    }

    static getInstance = (): ShopListItemsApiService => {
        if (!ShopListItemsApiService.instance) {
            ShopListItemsApiService.instance = new ShopListItemsApiService();
            // await ShopListService.instance.init();
        }

        return ShopListItemsApiService.instance;
    };

    // private async init() {
    //     this.seq = await this.getSeq();
    //
    // }

    async get(id: number) {
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

    async addOrUpdate(item: IShopListItem) {
        let newItem = null;
        // NOTE: DO NOT WHY, BUT I HAVE TO SET THE ID TO -1 to mark it as a new item
        // if is greater than 0 then is an existing item
        if (item && item.id && item.id > 0) {
            newItem = await this.update(item.id, item);
        } else {
            newItem = await this.add(item);
        }
        return newItem;
    };

    async addOrUpdateAll(items: IShopListItem[]): Promise<(IShopListItem | null)[]> {
        // i am going to try execute all promises one by one
        // to avoid screw up the sequence
        const newItems = [];

        for (const item of items) {
            const newItem = await this.addOrUpdate(item);
            newItems.push(newItem);
        };

        return newItems
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

    async cleanAll() {
        return await ShopListItemsStoreService.getInstance().cleanAll();
    }
}

