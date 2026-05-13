import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAngularSvgIcon } from 'angular-svg-icon';

export const appConfig: ApplicationConfig = {
	providers: [provideBrowserGlobalErrorListeners(), provideAngularSvgIcon()],
};
