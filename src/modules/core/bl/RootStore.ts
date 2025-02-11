import {makeAutoObservable} from 'mobx';
import {createContext, useContext} from 'react';
import {Services} from '@/src/services/Services';
import {ConfigStore} from './ConfigStore';
import {SplashScreen} from 'expo-router';
import {MovieStore} from '../../movies/bl/MovieStore';

export class RootStore {
	services: Services;
	configStore: ConfigStore;
	movieStore: MovieStore;

	constructor(services: Services) {
		makeAutoObservable(this);
		this.services = services;
		this.configStore = new ConfigStore(this);
		this.movieStore = new MovieStore(this);
	}

	async initApp() {
		await this.configStore.init();
		SplashScreen.hide();
	}
}

export const RootStoreContext = createContext<RootStore>({} as RootStore);
export const RootStoreProvider = RootStoreContext.Provider;
export const useStores = () => useContext(RootStoreContext);
