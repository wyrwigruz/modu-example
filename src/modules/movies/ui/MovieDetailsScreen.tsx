import React, {useCallback, useEffect} from 'react';
import styled from '@emotion/native';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../core/bl/RootStore';
import {LoadingStateSwitcher} from '../../core/ui/LoadingStateSwitcher';
import {RefreshControl, ScrollView} from 'react-native';
import {Stack, useLocalSearchParams} from 'expo-router';
import Animated, {FadeIn, SlideInRight} from 'react-native-reanimated';
import {useRefresh} from '@react-native-community/hooks';
import {Body1, Body2, H1} from '@/src/theme/Typography';
import {ThemoviedbUtil} from '@/src/modules/movies/utils/ThemoviedbUtil';

const AnimatedBody1 = Animated.createAnimatedComponent(Body1);

export const MovieDetailsScreen = observer(() => {
	const {id} = useLocalSearchParams<{id: string}>();
	const {movieStore} = useStores();
	const {isRefreshing, onRefresh} = useRefresh(() => fetchData(true));

	const fetchData = useCallback(
		async (refresh: boolean = false) => {
			if (id) {
				await movieStore.fetchMovieDetails(parseInt(id), refresh);
			}
		},
		[id, movieStore],
	);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	if (!movieStore.selectedMovie) {
		return null;
	}

	return (
		<>
			<Stack.Screen
				options={{
					title: movieStore.selectedMovie.title,
				}}
			/>
			<LoadingStateSwitcher loadingState={movieStore.detailsLoadingState} tryAgainCallback={fetchData}>
				<Container>
					<ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
						<HeaderImage
							source={{
								uri: `${ThemoviedbUtil.POSTER_BASE_URL}${movieStore.selectedMovie.poster_path}`,
							}}
							accessible={true}
							accessibilityRole={'image'}
						/>
						<ContentContainer entering={SlideInRight}>
							<H1>{movieStore.selectedMovie.title}</H1>
							<InfoRow entering={FadeIn.delay(200)}>
								<Body1>{movieStore.selectedMovie.vote_average.toFixed(1)}</Body1>
								<Body2>{movieStore.selectedMovie.release_date}</Body2>
							</InfoRow>
							<Overview entering={FadeIn.delay(400)}>{movieStore.selectedMovie.overview}</Overview>
						</ContentContainer>
					</ScrollView>
				</Container>
			</LoadingStateSwitcher>
		</>
	);
});

const Container = styled.View(({theme}) => ({
	flex: 1,
	backgroundColor: theme.navigation.colors.background,
}));

const HeaderImage = styled.Image({
	width: '100%',
	height: 300,
});

const ContentContainer = styled(Animated.View)(({theme}) => ({
	padding: 16,
	marginTop: -20,
	backgroundColor: theme.navigation.colors.card,
	borderTopLeftRadius: 20,
	borderTopRightRadius: 20,
}));

const InfoRow = styled(Animated.View)({
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginVertical: 8,
});

const Overview = styled(AnimatedBody1)({
	marginTop: 16,
	lineHeight: 24,
});
