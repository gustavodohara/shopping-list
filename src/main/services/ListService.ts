import AsyncStorage from '@react-native-community/async-storage';

export interface IShopList {
    /* id in collections */
    id?: number;
    /* name of list */
    name: string;
    /* date */
    date: string;
    /* id in store collection */
    store: number;
    /* array of items in items collection */
    items: number[]
}

const COLLECTION_KEY = '@LIST';
const COLLECTION_SEQ_KEY = '@LIST/SEQ';

export class ListService {
    private static instance: ListService;
    private seq = 0;

    constructor() {
    }

    static getInstance(): ListService {
        if (!ListService.instance) {
            ListService.instance = new ListService();
            // await ListService.instance.init();
        }

        return ListService.instance;
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

    async add(item: IShopList) {
        let list = await this.get();

        const newSeg = await this.incrementSeq();
        item.id = newSeg;
        list.push(item);

        const listToStorage = JSON.stringify(list);
        await AsyncStorage.setItem(COLLECTION_KEY, listToStorage);
    };

    async remove(id: number) {
        let list = await this.get();
        list = list.filter( (l: IShopList) => l.id !== id);
        const listToStorage = JSON.stringify(list);
        await AsyncStorage.setItem(COLLECTION_KEY, listToStorage);
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

