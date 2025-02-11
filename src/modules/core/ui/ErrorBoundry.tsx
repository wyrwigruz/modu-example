import React, {PropsWithChildren} from 'react';
import styled from '@emotion/native';
import {Button, StyleSheet} from 'react-native';
import RNRestart from 'react-native-restart';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ErrorTrackingService} from '@/src/services/errorTracking/ErrorTrackingService';

interface Props extends PropsWithChildren {
	errorTracking: ErrorTrackingService;
}

interface State {
	error: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
	state = {
		error: false,
	};

	static getDerivedStateFromError() {
		return {error: true};
	}

	componentDidCatch(error: Error) {
		this.props.errorTracking.logError(error);
	}

	restartApp = async () => {
		RNRestart.Restart();
	};

	render() {
		if (this.state.error) {
			return (
				<AbsoluteFillContainer testID={'errorBoundaryView'}>
					<Button title={'Try again'} onPress={this.restartApp} />
				</AbsoluteFillContainer>
			);
		} else {
			return this.props.children;
		}
	}
}

const AbsoluteFillContainer = styled(SafeAreaView)({
	...StyleSheet.absoluteFillObject,
	padding: 24,
	alignItems: 'center',
	justifyContent: 'center',
});
