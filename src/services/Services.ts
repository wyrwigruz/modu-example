import {ApiService} from './api/ApiService';
import {ErrorTrackingService} from './errorTracking/ErrorTrackingService';
import {StorageService} from './storage/StorageService';

export interface Services {
	errorTracking: ErrorTrackingService;
	api: ApiService;
	storage: StorageService;
}
