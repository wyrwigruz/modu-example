import {RootStore, RootStoreProvider} from '@/src/modules/core/bl/RootStore';
import React, {PropsWithChildren} from 'react';
import {ThemeProvider} from '@emotion/react';
import {Theme} from '@/src/theme/Theme';

interface Props extends PropsWithChildren {
	rootStore: RootStore;
}

export const TestWrapper = ({children, rootStore}: Props) => (
	<RootStoreProvider value={rootStore}>
		<ThemeProvider theme={Theme}>{children}</ThemeProvider>
	</RootStoreProvider>
);
