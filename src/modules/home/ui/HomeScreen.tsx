import {Text} from 'react-native';
import {VersionLabel} from '../../core/ui/VersionLabel';
import {observer} from 'mobx-react-lite';
import styled from '@emotion/native';
import {useTranslation} from 'react-i18next';

export const HomeScreen = observer(() => {
	const {t} = useTranslation('home');

	return (
		<Box>
			<Text>{t('title')}</Text>
			<VersionLabel />
		</Box>
	);
});

const Box = styled.View({
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
});
