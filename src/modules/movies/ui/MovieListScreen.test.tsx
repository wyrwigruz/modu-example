import React from 'react';
import {screen, waitFor} from '@testing-library/react-native';
import {ThemoviedbUtil} from '@/src/modules/movies/utils/ThemoviedbUtil';
import {RootStore} from '../../core/bl/RootStore';
import {MovieListScreen} from '@/src/modules/movies/ui/MovieListScreen';
import {TestFixtures} from '@/src/modules/core/utils/TestFixtures';
import {MoviesTestFixtures} from '@/src/modules/movies/utils/MoviesTestFixtures';
import {renderRouter} from '@/src/modules/core/utils/renderRouter';

let rootStore: RootStore;

beforeEach(() => {
	rootStore = TestFixtures.createRootStore();
	jest.clearAllMocks();
});

describe('MovieListScreen - fetch on mount', () => {
	it('fetchData gets invoked once on mount', async () => {
		//given
		const spy = jest.spyOn(rootStore.movieStore, 'fetchMovies');

		//when
		renderRouter({index: jest.fn(() => <MovieListScreen />)}, {rootStore});

		//then
		await waitFor(() => {
			expect(spy).toHaveBeenCalledWith(false);
		});
	});
});

describe('MovieListScreen - movie list rendering', () => {
	it('renders movie cards with movie details', async () => {
		//given
		const mockMovie = MoviesTestFixtures.MOCK_GET_POPULAR_MOVIES_RESPONSE.results[0];
		//when
		renderRouter({index: jest.fn(() => <MovieListScreen />)}, {rootStore});

		//then
		expect(await screen.findByText(mockMovie.title)).toBeOnTheScreen();
		expect(await screen.findByText(mockMovie.vote_average.toFixed(1))).toBeOnTheScreen();
		const expectedUri = `${ThemoviedbUtil.POSTER_BASE_URL}${mockMovie.poster_path}`;
		const posterImages = await screen.findAllByRole('image');
		expect(posterImages[0]).toHaveProp('source', {uri: expectedUri});
	});
});
