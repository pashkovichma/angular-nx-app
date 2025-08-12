import type { AuthConfig } from '@auth0/auth0-angular';

import { environment } from '../../environments/environment';

export const authConfig: AuthConfig = {
  domain: 'dev-2baniezemq68k6cz.us.auth0.com',
  clientId: 'qMLjkQzSMPj7DwMGGJY1Kq6a4P7YphZo',
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
  cacheLocation: 'localstorage',
  useRefreshTokens: true,
  httpInterceptor: {
    allowedList: [
      {
        uri: `${environment.apiUrl}/*`,
        tokenOptions: {
          authorizationParams: {},
        },
      },
    ],
  },
};
