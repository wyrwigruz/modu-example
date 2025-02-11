interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

interface Genre {
	id: number;
	name: string;
}

interface Collection {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
}

export interface Movie {
	id: number;
	title: string;
	original_title: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	vote_average: number;
	vote_count: number;
	release_date: string;
	popularity: number;
	adult: boolean;
	video: boolean;
	original_language: string;
	// Details fields
	belongs_to_collection?: Collection;
	budget?: number;
	genres?: Genre[];
	genre_ids?: number[];
	homepage?: string;
	imdb_id?: string;
	origin_country?: string[];
	production_countries?: ProductionCountry[];
	revenue?: number;
	runtime?: number;
	spoken_languages?: SpokenLanguage[];
	status?: string;
	tagline?: string;

	//
	hasDetails?: boolean;
}
