import {StorageController} from 'mobx-persist-store';
import {Locale} from '../../i18n/Locale';

export interface StorageService {
	storageController: StorageController;

	setLanguage(language: Locale | null): void;

	get language(): Locale | undefined;

	deleteSelectedLanguage(): void;

	clearAll(): void;
}
