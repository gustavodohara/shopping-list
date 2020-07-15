import AsyncStorage from '@react-native-community/async-storage';
import {IShopList} from '../interfaces/interfaces';

const COLLECTION_KEY = '@LIST';
const COLLECTION_SEQ_KEY = '@LIST/SEQ';

export class ShopListStoreService {
    private static instance: ShopListStoreService;
    private seq = 0;

    constructor() {
    }

    static getInstance(): ShopListStoreService {
        if (!ShopListStoreService.instance) {
            ShopListStoreService.instance = new ShopListStoreService();
            // await ShopListService.instance.init();
        }

        return ShopListStoreService.instance;
    }

    // private async init() {
    //     this.seq = await this.getSeq();
    //
    // }

    private async incrementSeq(): Promise<number> {
        let seq = await this.getSeq();
        seq++;
        await AsyncStorage.setItem(COLLECTION_SEQ_KEY, seq+'');
        return seq;
    }

    private async getSeq(): Promise<number> {
        const value = await AsyncStorage.getItem(COLLECTION_SEQ_KEY);
        if (value) {
            return +value;
        } else {
            return 0;
        }
    }

    async get(): Promise<IShopList[]> {
        const data = await AsyncStorage.getItem(COLLECTION_KEY);
        let list = [];
        if (data) {
            list = JSON.parse(data);
        }
        return list;
    }

    async getById(id: number): Promise<IShopList | null> {
        try {
            const data = await AsyncStorage.getItem(COLLECTION_KEY);
            let itemFind = null;
            let list = [];
            if (data) {
                list = JSON.parse(data);
            }
            itemFind = list.find((item: IShopList) =>  item.id && item.id === id);
            return itemFind
        } catch (e) {
            return null;
        }
    }

    async add(item: IShopList):  Promise<IShopList> {
        let list = await this.get();

        const newSeg = await this.incrementSeq();
        item.id = newSeg;
        list.push(item);

        const listToStorage = JSON.stringify(list);
        await AsyncStorage.setItem(COLLECTION_KEY, listToStorage);
        return item;
    };



    async remove(id: number): Promise<number> {
        let list = await this.get();

        /* remove items */

        /* remove shopList */
        list = list.filter( (l: IShopList) => l.id !== id);
        const listToStorage = JSON.stringify(list);
        await AsyncStorage.setItem(COLLECTION_KEY, listToStorage);
        return id;
    };

    async update(id: number, data: IShopList) {
        let list = await this.get();
        const itemFounded = list.find( (l: IShopList) => l.id === id);
        if (itemFounded) {
            let index = list.indexOf(itemFounded);
            list[index] = data;
            const listToStorage = JSON.stringify(list);
            await AsyncStorage.setItem(COLLECTION_KEY, listToStorage);
        }

    }
}

