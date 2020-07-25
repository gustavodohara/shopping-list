import {UnitsStoreService} from './store/UnitsStoreService';
import {IUnit} from './interfaces/interfaces';


export class UnitsService {
    private static instance: UnitsService;

    constructor() {
    }

    static getInstance(): UnitsService {
        if (!UnitsService.instance) {
            UnitsService.instance = new UnitsService();
            // await ShopListService.instance.init();
        }

        return UnitsService.instance;
    }

    // private async init() {
    //     this.seq = await this.getSeq();
    //
    // }

    async get(): Promise<IUnit[]> {
        return UnitsStoreService.getInstance().get();
    }
}

