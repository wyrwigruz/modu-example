import {en} from '../i18n/en';

declare module 'i18next' {
	interface CustomTypeOptions {
		resources: typeof en;
	}
}
