import styled from '@emotion/native';
import {useTheme} from '@emotion/react';
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import {ActivityIndicator, ButtonProps, TouchableOpacityProps} from 'react-native';
import * as Haptics from 'expo-haptics';
import {LoadingState} from '@/src/modules/core/utils/LoadingState';
import {GestureResponderEvent} from 'react-native/Libraries/Types/CoreEventTypes';

interface Props extends ButtonProps, TouchableOpacityProps {
	type?: 'primary' | 'outline' | 'link';
	loadingState?: LoadingState;
	hapticType?: Haptics.NotificationFeedbackType;
}

export const Button = observer(
	({
		type = 'primary',
		hapticType = Haptics.NotificationFeedbackType.Success,
		loadingState = LoadingState.DONE,
		disabled,
		onPress,
		...props
	}: Props) => {
		const theme = useTheme();

		const onBoxPress = useCallback(
			(event: GestureResponderEvent) => {
				if (onPress) {
					Haptics.notificationAsync(hapticType);
					onPress(event);
				}
			},
			[onPress, hapticType],
		);

		return (
			<Box onPress={onBoxPress} type={type} disabled={disabled} {...props}>
				{loadingState === LoadingState.PENDING ? (
					<ActivityIndicator
						size={'large'}
						color={theme.button[type!].text.color}
						accessibilityRole={'progressbar'}
						accessible={true}
					/>
				) : (
					<Text type={type} disabled={disabled}>
						{props.title}
					</Text>
				)}
			</Box>
		);
	},
);

const Box = styled.TouchableOpacity<Pick<Props, 'type' | 'disabled'>>(({theme, type, disabled}) => ({
	...theme.button[type!].box,
	...(disabled ? theme.button[type!]?.disabled?.box : null),
}));

const Text = styled.Text<Pick<Props, 'type' | 'disabled'>>(({theme, type, disabled}) => ({
	fontFamily: `${theme.text.fontFamily}`,
	...theme.button[type!].text,
	...(disabled ? theme.button[type!]?.disabled?.text : null),
}));
