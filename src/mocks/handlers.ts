import {http, HttpResponse} from 'msw';
import {MoviesTestFixtures} from '@/src/modules/movies/utils/MoviesTestFixtures';
import {ThemoviedbUtil} from '@/src/modules/movies/utils/ThemoviedbUtil';

export const handlers = [
	http.get(`${ThemoviedbUtil.BASE_URL}/movie/popular`, () => {
		return HttpResponse.json(MoviesTestFixtures.MOCK_GET_POPULAR_MOVIES_RESPONSE);
	}),
];
