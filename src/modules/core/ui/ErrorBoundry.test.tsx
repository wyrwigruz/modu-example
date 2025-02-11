import {render} from '@testing-library/react-native';
import React from 'react';
import {View} from 'react-native';
import {MockErrorTrackingService} from '@/src/services/errorTracking/MockErrorTrackingService';
import {ErrorBoundary} from './ErrorBoundry';

const ComponentWithBug = () => {
	throw new Error('Test error');
};
const errorTrackingService = new MockErrorTrackingService();

it('shows errorBoundaryView when children throws error', () => {
	// given
	const originalConsoleError = console.error;
	console.error = jest.fn();

	// when
	const {queryByTestId} = render(
		<ErrorBoundary errorTracking={errorTrackingService}>
			<ComponentWithBug />
		</ErrorBoundary>,
	);

	// then
	expect(queryByTestId('errorBoundaryView')).toBeTruthy();

	console.error = originalConsoleError;
});

it('shows children when there is no error in children renders', () => {
	// when
	const {queryByTestId} = render(
		<ErrorBoundary errorTracking={errorTrackingService}>
			<View />
		</ErrorBoundary>,
	);

	// then
	expect(queryByTestId('errorBoundaryView')).toBeFalsy();
});
