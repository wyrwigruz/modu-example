export interface ErrorTrackingService {
	logError(error: Error): void;
}
