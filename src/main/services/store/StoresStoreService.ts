import {IStore} from '../interfaces/interfaces';

const STORES: IStore[] = [
    {
        "id": 1,
        "name": "verduleria",
        "description": "frutas y verduras"
    },
    {
        "id": 2,
        "name": "carniceria",
        "description": "carne y fiambres"
    }

];

export class StoresStoreService {
    private static instance: StoresStoreService;

    constructor() {
    }

    static getInstance(): StoresStoreService {
        if (!StoresStoreService.instance) {
            StoresStoreService.instance = new StoresStoreService();
            // await ShopListService.instance.init();
        }

        return StoresStoreService.instance;
    }

    // private async init() {
    //     this.seq = await this.getSeq();
    //
    // }

    async get(): Promise<IStore[]> {
        return new Promise<IStore[]>(resolve => resolve(STORES))
    }
}

