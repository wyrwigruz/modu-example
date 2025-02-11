import {ApiResponse} from 'apisauce';
import {MovieResponse} from '@/src/services/api/MovieResponse';
import {Movie} from '@/src/services/api/Movie';

export interface ApiService {
	getPopularMovies(): Promise<ApiResponse<MovieResponse>>;

	getMovieDetails(id: number): Promise<ApiResponse<Movie>>;
}
