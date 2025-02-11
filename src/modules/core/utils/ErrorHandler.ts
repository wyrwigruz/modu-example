import {LoadingState} from '@/src/modules/core/utils/LoadingState';
import {ErrorTrackingService} from '@/src/services/errorTracking/ErrorTrackingService';
import {
	ApiResponse,
	CLIENT_ERROR,
	CONNECTION_ERROR,
	NETWORK_ERROR,
	SERVER_ERROR,
	TIMEOUT_ERROR,
	UNKNOWN_ERROR,
} from 'apisauce';

export class ErrorHandler {
	public static handleApiProblem(response: ApiResponse<any>, errorTrackingService: ErrorTrackingService): LoadingState {
		const unexpectedErrorBehavior = () => {
			errorTrackingService.logError(
				new Error(response.originalError?.message || 'Response without data and original error'),
			);
			return LoadingState.ERROR;
		};

		switch (response.problem) {
			case TIMEOUT_ERROR:
			case CONNECTION_ERROR:
			case NETWORK_ERROR:
				return LoadingState.NO_CONNECTION;
			case SERVER_ERROR:
			case UNKNOWN_ERROR:
				return unexpectedErrorBehavior();
			case CLIENT_ERROR:
				return unexpectedErrorBehavior();
			default:
				return unexpectedErrorBehavior();
		}
	}
}
