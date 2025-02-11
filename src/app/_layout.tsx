import {SplashScreen, Stack} from 'expo-router';
import {AppProvider} from '../modules/core/ui/AppProvider';
import {useStores} from '../modules/core/bl/RootStore';
import {ErrorBoundary} from '../modules/core/ui/ErrorBoundry';
import {observer} from 'mobx-react-lite';
import {LoadingStateSwitcher} from '@/src/modules/core/ui/LoadingStateSwitcher';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	return (
		<AppProvider>
			<MainStack />
		</AppProvider>
	);
}

export const MainStack = observer(() => {
	const {services, configStore} = useStores();
	return (
		<ErrorBoundary errorTracking={services.errorTracking}>
			<LoadingStateSwitcher loadingState={configStore.loadingState}>
				<Stack />
			</LoadingStateSwitcher>
		</ErrorBoundary>
	);
});
