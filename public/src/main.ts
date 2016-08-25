///<reference path="../../typings/main.d.ts"/>

import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide, enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS, Http } from '@angular/http';
import {APP_ROUTER_PROVIDERS} from './app.routes';
import {AppComponent} from './app.component';
import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt/angular2-jwt';
import {TRANSLATE_PROVIDERS, TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import 'rxjs/add/operator/map';

enableProdMode();

declare var toast: any;

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  TRANSLATE_PROVIDERS,
  provide(AuthConfig, {useValue: new AuthConfig({
    headerName: 'X-AUTH'
  })}),
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({
        headerName: 'X-AUTH'
      }), http);
    },
    deps: [Http]
  }),
  AuthHttp
]);