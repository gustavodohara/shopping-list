import AsyncStorage from '@react-native-community/async-storage';
import {IShopListItem} from '../interfaces/interfaces';

const COLLECTION_KEY = '@LIST_ITEMS';
const COLLECTION_SEQ_KEY = '@LIST_ITEMS/SEQ';


export const incrementSeqItems = async (): Promise<number> => {
    let seq = await getSeq();
    seq = seq + 1;
    await AsyncStorage.setItem(COLLECTION_SEQ_KEY, seq + '');
    return seq;
};

export const getSeq = async (): Promise<number> => {
    const value = await AsyncStorage.getItem(COLLECTION_SEQ_KEY);
    if (value) {
        return Number(value);
    } else {
        return 1;
    }
};

export class ShopListItemsStoreService {
    private static instance: ShopListItemsStoreService;
    private seq = 0;

    constructor() {
        this.get.bind(this);
        this.getByIds.bind(this);
        this.getAll.bind(this);
        this.add.bind(this);
        this.remove.bind(this);
        this.removeByIds.bind(this);
        this.update.bind(this);
        this.cleanAll.bind(this);
    }

    static getInstance(): ShopListItemsStoreService {
        if (!ShopListItemsStoreService.instance) {
            ShopListItemsStoreService.instance = new ShopListItemsStoreService();
            // await ShopListService.instance.init();
        }

        return ShopListItemsStoreService.instance;
    }

    // private async init() {
    //     this.seq = await this.getSeq();
    //
    // }

    async get(id: number): Promise<IShopListItem | null> {
        try {
            const data = await AsyncStorage.getItem(COLLECTION_KEY);
            let itemFounded: IShopListItem | null = null;
            if (data) {
                const list = JSON.parse(data);
                itemFounded = list.find((item: IShopListItem) => item.id === id)
            }
            return itemFounded;
        } catch (e) {
            return null;
        }
    }

    async getByIds(ids: number[]): Promise<IShopListItem[]> {
        try {
            const data = await AsyncStorage.getItem(COLLECTION_KEY);
            let itemsFounded: IShopListItem[] = [];
            if (data) {
                const list = JSON.parse(data);
                itemsFounded = list.filter(
                    ({id}: IShopListItem) => id && ids.includes(id)
                )
            }
            return itemsFounded;
        } catch (e) {
            return [];
        }
    }

    async getAll(): Promise<IShopListItem[]> {
        let list: IShopListItem[] = []
        try {
            const data = await AsyncStorage.getItem(COLLECTION_KEY);
            if (data) {
                list = JSON.parse(data);
            }
            return list;
        } catch (e) {
            return [];
        }
    }

    async add(item: IShopListItem) {
        let list = await this.getAll();

        const newSeg = await incrementSeqItems();
        item.id = newSeg;
        list.push(item);

        const listToStorage = JSON.stringify(list);
        await AsyncStorage.setItem(COLLECTION_KEY, listToStorage);
        return item;
    };

    async remove(id: number) {
        let list = await this.getAll();
        list = list.filter((l: IShopListItem) => l.id !== id);
        const listToStorage = JSON.stringify(list);
        await AsyncStorage.setItem(COLLECTION_KEY, listToStorage);
    };

    async removeByIds(ids: number[]) {
        let list = await this.getAll();
        list = list.filter(
            ({id}: IShopListItem) => id && !ids.includes(id)
        );
        const listToStorage = JSON.stringify(list);
        await AsyncStorage.setItem(COLLECTION_KEY, listToStorage);
    };

    async update(id: number, data: IShopListItem): Promise<IShopListItem | null> {
        let list = await this.getAll();
        const itemFounded = list.find((i: IShopListItem) => i.id === id);
        if (itemFounded) {
            let index = list.indexOf(itemFounded);
            list[index] = data;
            const listToStorage = JSON.stringify(list);
            await AsyncStorage.setItem(COLLECTION_KEY, listToStorage);
            return data;
        } else {
            return null;
        }

    }

    async cleanAll() {
        await AsyncStorage.setItem(COLLECTION_KEY, null);
    };
}

