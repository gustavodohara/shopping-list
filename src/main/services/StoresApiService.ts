import {IStore} from './interfaces/interfaces';
import {StoresStoreService} from './store/StoresStoreService';

export class StoresApiService {
    private static instance: StoresApiService;

    constructor() {
    }

    static getInstance(): StoresApiService {
        if (!StoresApiService.instance) {
            StoresApiService.instance = new StoresApiService();
            // await ShopListService.instance.init();
        }

        return StoresApiService.instance;
    }

    // private async init() {
    //     this.seq = await this.getSeq();
    //
    // }

    async get(): Promise<IStore[]> {
        return StoresStoreService.getInstance().get();
    }
}

