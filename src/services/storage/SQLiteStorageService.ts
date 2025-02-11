import {StorageController} from 'mobx-persist-store';
import Storage from 'expo-sqlite/kv-store';
import {Locale} from '../../i18n/Locale';
import {StorageService} from './StorageService';

export class SQLiteStorageService implements StorageService {
	storageController: StorageController;

	constructor() {
		this.storageController = {
			setItem: (key, data) => Storage.setItem(key, data),
			getItem: key => Storage.getItem(key),
			removeItem: key => Storage.removeItem(key),
		};
	}

	setLanguage(language: Locale): void {
		Storage.setItem('selectedLanguage', language);
	}

	get language(): Locale | undefined {
		const lang = Storage.getItemSync('selectedLanguage');
		return lang as Locale;
	}

	deleteSelectedLanguage(): void {
		Storage.removeItem('selectedLanguage');
	}

	clearAll() {
		Storage.clear();
	}
}
