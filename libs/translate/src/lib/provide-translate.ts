import { HttpClient, provideHttpClient } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import { importProvidersFrom, inject } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function provideTranslate(): ApplicationConfig['providers'] {
  return [
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: () => {
            const http = inject(HttpClient);

            return new TranslateHttpLoader(http, './assets/i18n/', '.json');
          },
        },
      }),
    ),
  ];
}
