import {MockContextConfig, renderRouter as erRenderRouter} from 'expo-router/build/testing-library';
import {render as rtlRender} from '@testing-library/react-native';
import {RootStore} from '@/src/modules/core/bl/RootStore';
import React from 'react';
import {TestFixtures} from '@/src/modules/core/utils/TestFixtures';
import {TestWrapper} from './TestWrapper';

type Props = Parameters<typeof rtlRender>[1] & {
	initialUrl?: any;
	rootStore?: RootStore;
};

export const renderRouter = (
	context: MockContextConfig,
	{initialUrl, rootStore = TestFixtures.createRootStore(), ...options}: Props = {},
) => {
	return erRenderRouter(context, {
		wrapper: props => <TestWrapper {...props} rootStore={rootStore} />,
		initialUrl,
		...options,
	});
};
