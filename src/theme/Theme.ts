import {Theme as ITheme} from '@emotion/react';
import {Theme as NTheme} from '@react-navigation/native';
import {Platform, ViewStyle} from 'react-native';

const COLOR_PALETTE = {
	primary: {
		black: '#181829',
		white: '#FFFFFF',
	},
	gray: {
		200: 'rgba(24, 24, 41, 0.35)',
	},
} as const;

const RADIUS = {
	1: 22,
} as const;

const SPACING = {
	full: '100%',
	base: 16,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
} as const;

const FONT_FAMILY = Platform.select({
	android: 'Roboto',
	default: 'Helvetica',
});

const FONT_SIZE = {
	base: 16,
	sm: 12,
	lg: 18,
	xl: 20,
	xxl: 24,
	xxxl: 28,
	huge: 32,
} as const;

const TYPOGRAPHY = {
	h1: {
		fontFamily: FONT_FAMILY,
		fontSize: FONT_SIZE.huge,
		fontWeight: '700' as const,
		lineHeight: 40,
		letterSpacing: -0.5,
	},
	h2: {
		fontFamily: FONT_FAMILY,
		fontSize: FONT_SIZE.xxxl,
		fontWeight: '700' as const,
		lineHeight: 36,
		letterSpacing: -0.25,
	},
	h3: {
		fontFamily: FONT_FAMILY,
		fontSize: FONT_SIZE.xxl,
		fontWeight: '600' as const,
		lineHeight: 32,
		letterSpacing: 0,
	},
	h4: {
		fontFamily: FONT_FAMILY,
		fontSize: FONT_SIZE.xl,
		fontWeight: '600' as const,
		lineHeight: 28,
		letterSpacing: 0.15,
	},
	h5: {
		fontFamily: FONT_FAMILY,
		fontSize: FONT_SIZE.lg,
		fontWeight: '500' as const,
		lineHeight: 24,
		letterSpacing: 0.15,
	},
	body1: {
		fontFamily: FONT_FAMILY,
		fontSize: FONT_SIZE.base,
		fontWeight: '400' as const,
		lineHeight: 24,
		letterSpacing: 0.15,
	},
	body2: {
		fontFamily: FONT_FAMILY,
		fontSize: FONT_SIZE.sm,
		fontWeight: '400' as const,
		lineHeight: 20,
		letterSpacing: 0.25,
	},
	caption: {
		fontFamily: FONT_FAMILY,
		fontSize: FONT_SIZE.sm,
		fontWeight: '400' as const,
		lineHeight: 16,
		letterSpacing: 0.4,
	},
	button: {
		fontFamily: FONT_FAMILY,
		fontSize: FONT_SIZE.sm,
		fontWeight: '600' as const,
		lineHeight: 20,
		letterSpacing: 0.25,
		textTransform: 'uppercase' as const,
	},
} as const;

const buttonCommonStyle = {
	borderRadius: RADIUS[1],
	height: SPACING.lg * 2,
	width: SPACING.full,
	alignItems: 'center' as const,
	justifyContent: 'center' as const,
	paddingHorizontal: SPACING.md,
} satisfies ViewStyle;

export const Theme: ITheme = {
	color: {
		button: COLOR_PALETTE.primary.black,
		buttonText: COLOR_PALETTE.primary.white,
		text: COLOR_PALETTE.primary.black,
	},
	navigation: {
		dark: false,
		colors: {
			primary: COLOR_PALETTE.primary.black,
			background: COLOR_PALETTE.primary.white,
			card: COLOR_PALETTE.primary.white,
			text: COLOR_PALETTE.primary.black,
			notification: COLOR_PALETTE.primary.black,
			border: COLOR_PALETTE.primary.black,
		},
	} as NTheme,
	button: {
		primary: {
			box: {
				...buttonCommonStyle,
				backgroundColor: COLOR_PALETTE.primary.black,
			},
			text: {
				...TYPOGRAPHY.button,
				color: COLOR_PALETTE.primary.white,
			},
			disabled: {
				box: {
					backgroundColor: COLOR_PALETTE.gray[200],
				},
				text: {
					opacity: 0.7,
				},
			},
		},
		outline: {
			box: {
				...buttonCommonStyle,
				borderColor: COLOR_PALETTE.primary.black,
				borderWidth: 1,
			},
			text: {
				...TYPOGRAPHY.button,
				color: COLOR_PALETTE.primary.black,
			},
		},
		link: {
			box: {
				...buttonCommonStyle,
				height: SPACING.lg * 2,
				backgroundColor: 'transparent',
			},
			text: {
				...TYPOGRAPHY.caption,
				color: COLOR_PALETTE.primary.black,
			},
		},
	},
	text: {
		fontFamily: FONT_FAMILY,
		...TYPOGRAPHY,
	},
};
