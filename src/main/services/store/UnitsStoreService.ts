import {IUnit} from '../interfaces/interfaces';

const UNITS: IUnit[] = [
    {
        "id": 1,
        "name": "unidades",
    },
    {
        "id": 2,
        "name": "kilos",
    }

];

export class UnitsStoreService {
    private static instance: UnitsStoreService;

    constructor() {
    }

    static getInstance(): UnitsStoreService {
        if (!UnitsStoreService.instance) {
            UnitsStoreService.instance = new UnitsStoreService();
            // await ShopListService.instance.init();
        }

        return UnitsStoreService.instance;
    }

    // private async init() {
    //     this.seq = await this.getSeq();
    //
    // }

    async get(): Promise<IUnit[]> {
        return new Promise<IUnit[]>(resolve => resolve(UNITS))
    }
}

