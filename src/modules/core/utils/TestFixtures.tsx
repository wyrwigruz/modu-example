import {HttpApiService} from '@/src/services/api/HttpApiService';
import {MockErrorTrackingService} from '@/src/services/errorTracking/MockErrorTrackingService';
import {SQLiteStorageService} from '@/src/services/storage/SQLiteStorageService';
import {PersistStoreMap} from 'mobx-persist-store';
import {RootStore} from '../bl/RootStore';

export class TestFixtures {
	static createRootStore(): RootStore {
		const errorTrackingService = new MockErrorTrackingService();
		const httpApiService = new HttpApiService();
		const storageService = new SQLiteStorageService();

		return new RootStore({
			errorTracking: errorTrackingService,
			api: httpApiService,
			storage: storageService,
		});
	}

	static async sleep(milliseconds: number) {
		return new Promise(resolve => setTimeout(resolve, milliseconds));
	}

	static async flushPromises() {
		return new Promise(setImmediate);
	}

	static stopPersistAllStores() {
		Array.from(PersistStoreMap.values()).map(persistStore => persistStore.stopPersisting());
	}
}
