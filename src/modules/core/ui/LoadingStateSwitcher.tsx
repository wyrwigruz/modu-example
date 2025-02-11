import styled from '@emotion/native';
import i18n from 'i18next';
import React, {FC, PropsWithChildren, ReactNode} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {H2} from '@/src/theme/Typography';
import {Button} from './Button';
import {LoadingState} from '../utils/LoadingState';
import {observer} from 'mobx-react-lite';

interface Props extends PropsWithChildren {
	loadingState: LoadingState;
	tryAgainCallback?: () => void;
	renderProgress?: () => ReactNode;
	renderError?: () => ReactNode;
	renderNoConnection?: () => ReactNode;
	shouldRenderChildren?: boolean;
	reFetch?: boolean;
}

export const LoadingStateSwitcher: FC<Props> = observer(
	({
		loadingState,
		shouldRenderChildren,
		renderProgress = () => (
			<DefaultProgressContainer>
				<ActivityIndicator size={64} color={'#FFFFFF'} />
			</DefaultProgressContainer>
		),
		renderError = () => (
			<AbsoluteFillContainer>
				<Button title={'Try again'} onPress={tryAgainCallback} />
			</AbsoluteFillContainer>
		),
		renderNoConnection = () => (
			<AbsoluteFillContainer>
				<H2>{i18n.t('noConnection:noInternetConnection')}</H2>
				<H2>{i18n.t('noConnection:information')}</H2>
				<Button title={i18n.t('noConnection:tryAgain')} onPress={tryAgainCallback} />
			</AbsoluteFillContainer>
		),
		children,
		tryAgainCallback,
	}) => {
		if (loadingState === LoadingState.PENDING && renderProgress) {
			return (
				<>
					{shouldRenderChildren && children}
					{renderProgress()}
				</>
			);
		}

		if (loadingState === LoadingState.ERROR && tryAgainCallback) {
			return (
				<>
					{shouldRenderChildren && children}
					{renderError()}
				</>
			);
		}

		if (loadingState === LoadingState.NO_CONNECTION && tryAgainCallback) {
			return (
				<>
					{shouldRenderChildren && children}
					{renderNoConnection()}
				</>
			);
		}

		return <>{children}</>;
	},
);

const AbsoluteFillContainer = styled(SafeAreaView)({
	...StyleSheet.absoluteFillObject,
	padding: 24,
	alignItems: 'center',
	justifyContent: 'center',
});

const DefaultProgressContainer = styled(AbsoluteFillContainer)({
	backgroundColor: '#00000030',
});
