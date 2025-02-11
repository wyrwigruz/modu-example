import {ErrorTrackingService} from './ErrorTrackingService';

export class MockErrorTrackingService implements ErrorTrackingService {
	constructor() {
		//todo add error tracking initialization
		console.log('MockErrorTrackingService initialized');
	}

	logError(error: Error): void {
		//todo add error tracking logging
		console.error('Error', error);
	}
}
