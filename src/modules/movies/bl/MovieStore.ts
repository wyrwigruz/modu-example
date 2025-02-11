import {makeAutoObservable, runInAction} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import {RootStore} from '../../core/bl/RootStore';
import {LoadingState} from '../../core/utils/LoadingState';
import {Movie} from '@/src/services/api/Movie';
import {ErrorHandler} from '@/src/modules/core/utils/ErrorHandler';

export class MovieStore {
	movies: Record<number, Movie> = {};
	loadingState: LoadingState = LoadingState.DONE;
	detailsLoadingState: LoadingState = LoadingState.DONE;
	selectedMovieId: number | null = null;

	constructor(private rootStore: RootStore) {
		makeAutoObservable(this);
		makePersistable(this, {
			name: 'MovieStore',
			properties: ['movies'],
			storage: this.rootStore.services.storage.storageController,
		});
	}

	get moviesList() {
		return Object.values(this.movies);
	}

	get selectedMovie() {
		return this.selectedMovieId ? this.movies[this.selectedMovieId] : null;
	}

	async fetchMovies(refresh: boolean = false) {
		const {api, errorTracking} = this.rootStore.services;
		if (!refresh && Object.keys(this.movies).length > 0) {
			return;
		}

		this.loadingState = LoadingState.PENDING;
		const response = await api.getPopularMovies();
		runInAction(() => {
			if (response.ok && response.data) {
				this.movies = response.data.results.reduce(
					(acc, movie) => {
						acc[movie.id] = movie;
						return acc;
					},
					{} as Record<number, Movie>,
				);
				this.loadingState = LoadingState.DONE;
			} else {
				this.loadingState = ErrorHandler.handleApiProblem(response, errorTracking);
			}
		});
	}

	async fetchMovieDetails(id: number, refresh: boolean = false) {
		const {api, errorTracking} = this.rootStore.services;
		console.log('hasDetails', this.movies[id]?.hasDetails);
		this.selectedMovieId = id;
		if (!refresh && this.movies[id]?.hasDetails) {
			return;
		}

		console.log('fetching details for', id);
		this.detailsLoadingState = LoadingState.PENDING;
		const response = await api.getMovieDetails(id);
		runInAction(() => {
			if (response.ok && response.data) {
				this.movies[id] = response.data;
				this.movies[id].hasDetails = true;
				this.detailsLoadingState = LoadingState.DONE;
			} else {
				this.detailsLoadingState = ErrorHandler.handleApiProblem(response, errorTracking);
			}
		});
	}
}
