import {ApiResponse, ApisauceInstance, create} from 'apisauce';
import {ApiService} from './ApiService';
import {MovieResponse} from '@/src/services/api/MovieResponse';
import {Movie} from '@/src/services/api/Movie';
import {ThemoviedbUtil} from '@/src/modules/movies/utils/ThemoviedbUtil';

export class HttpApiService implements ApiService {
	private api: ApisauceInstance;

	constructor() {
		this.api = create({
			baseURL: ThemoviedbUtil.BASE_URL,
			headers: {'Content-Type': 'application/json'},
		});
	}

	async getPopularMovies(): Promise<ApiResponse<MovieResponse>> {
		return this.api.get('/movie/popular', {api_key: ThemoviedbUtil.API_KEY});
	}

	async getMovieDetails(id: number): Promise<ApiResponse<Movie>> {
		return this.api.get(`/movie/${id}`, {api_key: ThemoviedbUtil.API_KEY});
	}
}
