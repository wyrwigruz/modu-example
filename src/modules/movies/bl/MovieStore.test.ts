import {runInAction} from 'mobx';
import {MovieStore} from '@/src/modules/movies/bl/MovieStore';
import {LoadingState} from '@/src/modules/core/utils/LoadingState';
import {ErrorHandler} from '@/src/modules/core/utils/ErrorHandler';
import {RootStore} from '@/src/modules/core/bl/RootStore';
import {TestFixtures} from '@/src/modules/core/utils/TestFixtures';
import {ThemoviedbUtil} from '@/src/modules/movies/utils/ThemoviedbUtil';
import {server} from '@/src/mocks/server';
import {http, HttpResponse} from 'msw';

let rootStore: RootStore;
let movieStore: MovieStore;

beforeEach(() => {
	rootStore = TestFixtures.createRootStore();
	movieStore = rootStore.movieStore;
});

describe('fetchMovies', () => {
	it('invokes fetchMovies and populates movies on success', async () => {
		//when
		await movieStore.fetchMovies();

		//then
		expect(movieStore.moviesList).toHaveLength(1);
		expect(movieStore.loadingState).toEqual(LoadingState.DONE);
	});

	it('skips fetching if movies already exist and refresh is false', async () => {
		//given
		// Pre-populate movies
		runInAction(() => {
			movieStore.movies = {
				1: {
					id: 1,
					title: 'Existing Movie',
					poster_path: '/existing.jpg',
					vote_average: 9.0,
					release_date: '2020-03-01',
					overview: 'Existing overview',
				},
			};
		});
		const spy = jest.spyOn(rootStore.services.api, 'getPopularMovies');

		//when
		await movieStore.fetchMovies();

		//then
		expect(spy).not.toHaveBeenCalled();
	});

	it('assigns error loadingState on failure during fetchMovies', async () => {
		//given
		server.use(
			http.get(`${ThemoviedbUtil.BASE_URL}/movie/popular`, () => {
				return HttpResponse.error();
			}),
		);
		const spy = jest.spyOn(ErrorHandler, 'handleApiProblem');

		//when
		await movieStore.fetchMovies(true);

		//then
		expect(spy).toHaveBeenCalled();
		expect(movieStore.loadingState).toEqual(LoadingState.ERROR);
	});
});

describe('fetchMovieDetails', () => {
	//todo
});
