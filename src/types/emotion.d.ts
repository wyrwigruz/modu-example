import '@emotion/react';
import {Theme as NavigationTheme} from '@react-navigation/native';
import {TextStyle, ViewStyle} from 'react-native';

declare module '@emotion/react' {
	export interface Theme {
		color: {
			button: string;
			buttonText: string;
			text: string;
		};
		text: {
			fontFamily: string;
			h1: TextStyle;
			h2: TextStyle;
			h3: TextStyle;
			h4: TextStyle;
			h5: TextStyle;
			body1: TextStyle;
			body2: TextStyle;
			button: TextStyle;
			caption: TextStyle;
		};
		navigation: NavigationTheme;
		button: {
			primary: {
				box: ViewStyle;
				text: TextStyle;
				disabled?: {
					box: ViewStyle;
					text: TextStyle;
				};
			};
			outline: {
				box: ViewStyle;
				text: TextStyle;
				disabled?: {
					box: ViewStyle;
					text: TextStyle;
				};
			};
			link: {
				box: ViewStyle;
				text: TextStyle;
				disabled?: {
					box: ViewStyle;
					text: TextStyle;
				};
			};
		};
	}
}
