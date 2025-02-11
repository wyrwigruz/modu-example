import styled from '@emotion/native';

export const H1 = styled.Text(({theme}) => ({
	...theme.text.h1,
	color: theme.color.text,
}));

export const H2 = styled.Text(({theme}) => ({
	...theme.text.h2,
	color: theme.color.text,
}));

export const H3 = styled.Text(({theme}) => ({
	...theme.text.h3,
	color: theme.color.text,
}));

export const H4 = styled.Text(({theme}) => ({
	...theme.text.h4,
	color: theme.color.text,
}));

export const H5 = styled.Text(({theme}) => ({
	...theme.text.h5,
	color: theme.color.text,
}));

export const H6 = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const H7 = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const Subtitle1 = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const Subtitle2 = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const Body1 = styled.Text(({theme}) => ({
	...theme.text.body1,
	color: theme.color.text,
}));

export const Body2 = styled.Text(({theme}) => ({
	...theme.text.body2,
	color: theme.color.text,
}));

export const Body3 = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));

export const ButtonText = styled.Text(({theme}) => ({
	...theme.text.button,
	color: theme.color.text,
}));

export const Caption = styled.Text(({theme}) => ({
	...theme.text.caption,
	color: theme.color.text,
}));

export const Overline = styled.Text(({theme}) => ({
	fontFamily: `${theme.text.fontFamily}`,
}));
