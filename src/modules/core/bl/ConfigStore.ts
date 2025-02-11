import i18n from 'i18next';
import _ from 'lodash';
import {makeAutoObservable} from 'mobx';
import {initReactI18next} from 'react-i18next';
import RNRestart from 'react-native-restart';
import {RootStore} from './RootStore';
import {LoadingState} from '../utils/LoadingState';
import {getLocales} from 'expo-localization';
import {en} from '@/src/i18n/en';
import {pl} from '@/src/i18n/pl';
import {Locale} from '@/src/i18n/Locale';

export class ConfigStore {
	rootStore: RootStore;
	loadingState: LoadingState = LoadingState.PENDING;
	readonly defaultLanguage: Locale = Locale.EN;
	selectedLanguage: Locale | null = null;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);

		this.rootStore = rootStore;
	}

	//======================
	// Actions
	//======================
	setLoadingState(loadingState: LoadingState) {
		this.loadingState = loadingState;
	}

	//======================
	// API
	//======================
	async init() {
		await this.initializeTranslations();

		this.setLoadingState(LoadingState.DONE);
	}

	restartApp() {
		RNRestart.restart();
	}

	//======================
	// Rest
	//======================

	private async initializeTranslations() {
		let initialLanguage = this.getInitialLanguage();

		await i18n.use(initReactI18next).init({
			fallbackLng: [Locale.EN],
			defaultNS: 'common',
			resources: {en, pl},
			interpolation: {
				escapeValue: false,
			},
			lng: initialLanguage,
		});
		this.selectedLanguage = initialLanguage;
	}

	*changeLanguage(language: Locale) {
		const {storage} = this.rootStore.services;

		storage.setLanguage(language);
		yield i18n.changeLanguage(language);
		this.selectedLanguage = language;
	}

	private getInitialLanguage(): Locale {
		const {storage} = this.rootStore.services;

		let selectedLanguage: Locale;
		const deviceLanguage = getLocales()[0].languageCode;
		const userLanguage = storage.language;

		if (!userLanguage) {
			selectedLanguage = deviceLanguage as Locale;
		} else {
			selectedLanguage = storage.language;
		}
		return _.includes(Locale, selectedLanguage) ? selectedLanguage : this.defaultLanguage;
	}
}
