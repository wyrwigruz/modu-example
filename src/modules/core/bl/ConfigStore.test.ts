import i18n from 'i18next';
import {Locale} from '@/src/i18n/Locale';
import {TestFixtures} from '../utils/TestFixtures';
import * as ExpoLocalization from 'expo-localization';
import {flowResult} from 'mobx';

const rootStore = TestFixtures.createRootStore();

describe('init', () => {
	afterEach(() => {
		rootStore.services.storage.clearAll();
	});

	it('uses user language from storage if set', async () => {
		//given
		jest.spyOn(ExpoLocalization, 'getLocales').mockReturnValue([
			{
				languageTag: 'pl-PL',
				languageCode: 'pl',
				textDirection: 'ltr',
				digitGroupingSeparator: ' ',
				decimalSeparator: ',',
				measurementSystem: 'metric',
				currencyCode: 'PLN',
				currencySymbol: 'zł',
				regionCode: 'PL',
				temperatureUnit: 'celsius',
				langageCurrencyCode: null,
				langageCurrencySymbol: null,
				languageRegionCode: null,
			},
		]);
		rootStore.services.storage.setLanguage(Locale.PL);

		//when
		debugger;
		await rootStore.configStore.init();

		//then
		expect(rootStore.configStore.selectedLanguage).toBe(Locale.PL);
	});

	it('uses device language if there is no user language in storage', async () => {
		//given
		jest.spyOn(ExpoLocalization, 'getLocales').mockReturnValue([
			{
				languageTag: 'pl-PL',
				languageCode: 'pl',
				textDirection: 'ltr',
				digitGroupingSeparator: ' ',
				decimalSeparator: ',',
				measurementSystem: 'metric',
				currencyCode: 'PLN',
				currencySymbol: 'zł',
				regionCode: 'PL',
				temperatureUnit: 'celsius',
				langageCurrencyCode: null,
				langageCurrencySymbol: null,
				languageRegionCode: null,
			},
		]);

		//when
		await rootStore.configStore.init();

		//then
		expect(rootStore.configStore.selectedLanguage).toBe(Locale.PL);
		jest.restoreAllMocks();
	});

	it('uses default language if device language is out of supported languages', async () => {
		//given
		jest.spyOn(ExpoLocalization, 'getLocales').mockReturnValue([
			{
				languageTag: 'mi-MI',
				languageCode: 'mi',
				textDirection: 'ltr',
				digitGroupingSeparator: ' ',
				decimalSeparator: ',',
				measurementSystem: null,
				currencyCode: null,
				currencySymbol: null,
				regionCode: null,
				temperatureUnit: null,
				langageCurrencyCode: null,
				langageCurrencySymbol: null,
				languageRegionCode: null,
			},
		]);

		//when
		await rootStore.configStore.init();

		//then
		expect(rootStore.configStore.selectedLanguage).toBe(rootStore.configStore.defaultLanguage);
	});

	it('uses default language if user language from storage is out of supported languages', async () => {
		//given
		rootStore.services.storage.setLanguage('mi' as Locale);

		//when
		await rootStore.configStore.init();

		//then
		expect(rootStore.configStore.selectedLanguage).toBe(rootStore.configStore.defaultLanguage);
	});
});

describe('changeLanguage', () => {
	it('sets language in i18n, storage and store', async () => {
		//given
		await rootStore.configStore.init();
		expect(rootStore.configStore.selectedLanguage).toBe(rootStore.configStore.defaultLanguage);
		expect(Locale.PL).not.toBe(rootStore.configStore.defaultLanguage);

		//when
		await flowResult(rootStore.configStore.changeLanguage(Locale.PL));

		//then
		expect(i18n.language).toBe(Locale.PL);
		expect(rootStore.services.storage.language).toBe(Locale.PL);
		expect(rootStore.configStore.selectedLanguage).toBe(Locale.PL);
	});
});
