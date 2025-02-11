import {server} from '@/src/mocks/server';
import {configure} from 'mobx';
import {setUpTests} from 'react-native-reanimated';
import {TestFixtures} from '../modules/core/utils/TestFixtures';

configure({safeDescriptors: false, enforceActions: 'never'});
setUpTests();

beforeAll(() => {
	server.listen();
});
afterEach(() => {
	server.resetHandlers();
	TestFixtures.stopPersistAllStores();
});
afterAll(() => server.close());
