export interface IStore {
    /* id in collections */
    id?: number;
    /* name of list */
    name: string;
    /* description of the store */
    description: string;
}

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

export class StoresService {
    private static instance: StoresService;

    constructor() {
    }

    static getInstance(): StoresService {
        if (!StoresService.instance) {
            StoresService.instance = new StoresService();
            // await ShopListService.instance.init();
        }

        return StoresService.instance;
    }

    // private async init() {
    //     this.seq = await this.getSeq();
    //
    // }

    async get(): Promise<IStore[]> {
        return new Promise<IStore[]>(resolve => resolve(STORES))
    }
}

