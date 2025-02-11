import React from 'react';
import {screen, userEvent} from '@testing-library/react-native';
import {Button} from './Button';
import * as Haptics from 'expo-haptics';
import {LoadingState} from '@/src/modules/core/utils/LoadingState';
import {render} from '@/src/modules/core/utils/render';

jest.mock('expo-haptics', () => ({
	notificationAsync: jest.fn(),
	NotificationFeedbackType: {
		Success: 'Success',
		Error: 'Error',
		Warning: 'Warning',
	},
}));

beforeEach(() => {
	jest.clearAllMocks();
});

describe('Button component', () => {
	it('renders button text when not loading', () => {
		// given
		const buttonTitle = 'Test Button';
		render(<Button title={buttonTitle} loadingState={LoadingState.DONE} />);
		// when
		const buttonText = screen.getByText(buttonTitle);
		// then
		expect(buttonText).toBeOnTheScreen();
	});

	it('renders activity indicator when loading', () => {
		// given
		const buttonTitle = 'Test Button';
		render(<Button title={buttonTitle} loadingState={LoadingState.PENDING} />);
		// when
		const activityIndicator = screen.getByRole('progressbar');
		// then
		expect(activityIndicator).toBeOnTheScreen();
	});

	it('calls onPress and triggers haptics feedback on press', async () => {
		// given
		const buttonTitle = 'Press me';
		const onPressMock = jest.fn();
		render(<Button title={buttonTitle} loadingState={LoadingState.DONE} onPress={onPressMock} />);
		const button = screen.getByText(buttonTitle);
		// when
		jest.useFakeTimers();
		await userEvent.press(button);
		jest.useRealTimers();
		// then
		expect(onPressMock).toHaveBeenCalled();
		expect(Haptics.notificationAsync).toHaveBeenCalledWith(Haptics.NotificationFeedbackType.Success);
	});

	it("doesn't call onPress when disabled", async () => {
		// given
		const buttonTitle = 'Disabled button';
		const onPressMock = jest.fn();
		render(<Button title={buttonTitle} disabled loadingState={LoadingState.DONE} onPress={onPressMock} />);
		const button = screen.getByText(buttonTitle);
		// when
		await userEvent.press(button);
		// then
		expect(onPressMock).not.toHaveBeenCalled();
	});
});
