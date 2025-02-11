import {ThemeProvider} from '@emotion/react';
import React, {PropsWithChildren, useEffect} from 'react';
import {RootStore, RootStoreProvider} from '../bl/RootStore';
import {HttpApiService} from '@/src/services/api/HttpApiService';
import {MockErrorTrackingService} from '@/src/services/errorTracking/MockErrorTrackingService';
import {SQLiteStorageService} from '@/src/services/storage/SQLiteStorageService';
import {Theme} from '@/src/theme/Theme';

const errorTrackingService = new MockErrorTrackingService();
const httpApiService = new HttpApiService();
const storageService = new SQLiteStorageService();

const rootStore = new RootStore({
	errorTracking: errorTrackingService,
	api: httpApiService,
	storage: storageService,
});

export const AppProvider: React.FC<PropsWithChildren> = ({children}) => {
	useEffect(() => {
		rootStore.initApp();
	}, []);

	return (
		<RootStoreProvider value={rootStore}>
			<ThemeProvider theme={Theme}>{children}</ThemeProvider>
		</RootStoreProvider>
	);
};
