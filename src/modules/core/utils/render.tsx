import React, {ReactElement} from 'react';
import {render as rtlRender, renderHook as rtlRenderHook} from '@testing-library/react-native/build/pure';
import {TestFixtures} from '@/src/modules/core/utils/TestFixtures';
import {TestWrapper} from '@/src/modules/core/utils/TestWrapper';

export const render = (ui: ReactElement, {rootStore = TestFixtures.createRootStore(), ...options} = {}) => {
	return rtlRender(ui, {wrapper: props => <TestWrapper {...props} rootStore={rootStore} />, ...options});
};

export const renderHook = <Result, Props>(
	renderCallback: (props: Props) => Result,
	{rootStore = TestFixtures.createRootStore(), ...options} = {},
) => {
	return rtlRenderHook(renderCallback, {
		wrapper: props => <TestWrapper {...props} rootStore={rootStore} />,
		...options,
	});
};
