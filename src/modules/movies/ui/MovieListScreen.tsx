import React, {useCallback, useEffect} from 'react';
import styled, {css} from '@emotion/native';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../core/bl/RootStore';
import {LoadingStateSwitcher} from '../../core/ui/LoadingStateSwitcher';
import {FlatList, Pressable, RefreshControl} from 'react-native';
import {router, Stack} from 'expo-router';
import Animated, {FadeInDown} from 'react-native-reanimated';

import {Movie} from '@/src/services/api/Movie';
import {useRefresh} from '@react-native-community/hooks';
import {Body1, H5} from '@/src/theme/Typography';
import {ThemoviedbUtil} from '@/src/modules/movies/utils/ThemoviedbUtil';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const MovieListScreen = observer(() => {
	const {movieStore} = useStores();

	const {isRefreshing, onRefresh} = useRefresh(() => fetchData(true));

	const fetchData = useCallback(
		async (refresh: boolean = false) => {
			await movieStore.fetchMovies(refresh);
		},
		[movieStore],
	);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const renderMovie = ({item, index}: {item: Movie; index: number}) => {
		return (
			<MovieCard entering={FadeInDown.delay(index * 100)} onPress={() => router.push(`/movie/${item.id}`)}>
				<MoviePoster
					source={{uri: `${ThemoviedbUtil.POSTER_BASE_URL}${item.poster_path}`}}
					accessible={true}
					accessibilityRole={'image'}
				/>
				<MovieTitle>{item.title}</MovieTitle>
				<MovieRating>{item.vote_average.toFixed(1)}</MovieRating>
			</MovieCard>
		);
	};

	return (
		<>
			<Stack.Screen
				options={{
					title: 'Movies',
				}}
			/>
			<LoadingStateSwitcher loadingState={movieStore.loadingState} tryAgainCallback={fetchData}>
				<Container>
					<FlatList
						data={movieStore.moviesList}
						renderItem={renderMovie}
						contentContainerStyle={listStyles}
						keyExtractor={item => item.id.toString()}
						numColumns={2}
						refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
					/>
				</Container>
			</LoadingStateSwitcher>
		</>
	);
});

const listStyles = css({
	padding: 8,
});

const Container = styled.View(({theme}) => ({
	flex: 1,
	backgroundColor: theme.navigation.colors.background,
}));

const MovieCard = styled(AnimatedPressable)(({theme}) => ({
	flex: 1,
	margin: 8,
	backgroundColor: theme.navigation.colors.card,
	borderRadius: 12,
	elevation: 4,
	shadowColor: theme.color.text,
	shadowOffset: {width: 0, height: 2},
	shadowOpacity: 0.25,
	shadowRadius: 3.84,
}));

const MoviePoster = styled.Image({
	width: '100%',
	height: 200,
	borderTopLeftRadius: 12,
	borderTopRightRadius: 12,
});

const MovieTitle = styled(H5)({
	padding: 8,
});

const MovieRating = styled(Body1)(({theme}) => ({
	position: 'absolute',
	top: 8,
	right: 8,
	backgroundColor: 'rgba(0,0,0,0.7)',
	color: theme.color.buttonText,
	padding: 4,
	borderRadius: 4,
}));
