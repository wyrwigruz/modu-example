import {render} from '@testing-library/react-native';
import React from 'react';
import {View} from 'react-native';
import {LoadingState} from '../utils/LoadingState';
import {LoadingStateSwitcher} from './LoadingStateSwitcher';

const TestProgres = () => <View testID={'testProgressView'} />;
const TestError = () => <View testID={'testErrorView'} />;
const TestNoConnection = () => <View testID={'testNoConnectionView'} />;

it('shows progress component when loadingState is pending', () => {
	// given
	const {queryByTestId} = render(
		<LoadingStateSwitcher
			loadingState={LoadingState.PENDING}
			tryAgainCallback={() => {}}
			renderProgress={() => <TestProgres />}
		/>,
	);

	// then
	expect(queryByTestId('testProgressView')).toBeTruthy();
});

it('shows error component when loadingState is error', () => {
	// given
	const {queryByTestId} = render(
		<LoadingStateSwitcher
			loadingState={LoadingState.ERROR}
			tryAgainCallback={() => {}}
			renderError={() => <TestError />}
		/>,
	);

	// then
	expect(queryByTestId('testErrorView')).toBeTruthy();
});

it('shows no connection component when loadingState is no connection', () => {
	// given
	const {queryByTestId} = render(
		<LoadingStateSwitcher
			loadingState={LoadingState.NO_CONNECTION}
			tryAgainCallback={() => {}}
			renderNoConnection={() => <TestNoConnection />}
		/>,
	);

	// then
	expect(queryByTestId('testNoConnectionView')).toBeTruthy();
});

it('does not render children in any state except done by default', () => {
	// given
	const {queryByTestId, rerender} = render(
		<LoadingStateSwitcher loadingState={LoadingState.PENDING} tryAgainCallback={() => {}}>
			<View testID={'childView'} />
		</LoadingStateSwitcher>,
	);

	// then
	expect(queryByTestId('childView')).toBeFalsy();

	// when
	rerender(
		<LoadingStateSwitcher loadingState={LoadingState.DONE} tryAgainCallback={() => {}}>
			<View testID={'childView'} />
		</LoadingStateSwitcher>,
	);

	// then
	expect(queryByTestId('childView')).toBeTruthy();
});

it('render children in any state when shouldRenderChildren is true', () => {
	// given
	const {queryByTestId} = render(
		<LoadingStateSwitcher
			loadingState={LoadingState.PENDING}
			tryAgainCallback={() => {}}
			shouldRenderChildren={true}
			renderProgress={() => <TestNoConnection />}>
			<View testID={'childView'} />
		</LoadingStateSwitcher>,
	);

	// then
	expect(queryByTestId('childView')).toBeTruthy();
	expect(queryByTestId('testNoConnectionView')).toBeTruthy();
});
