import {Body1} from '@/src/theme/Typography';
import React from 'react';
import * as Application from 'expo-application';
import {observer} from 'mobx-react-lite';

export const VersionLabel = observer(() => {
	return (
		<>
			<Body1>{`Version name: ${Application.nativeApplicationVersion}`}</Body1>
			<Body1>{`Version code: ${Application.nativeBuildVersion}`}</Body1>
			<Body1>{`Variant: ${__DEV__ ? 'debug' : 'release'}`}</Body1>
		</>
	);
});
