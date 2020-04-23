import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PingProvider } from '../providers/ping/ping';
import { LoadingProvider } from '../providers/loading/loading';
import { JoinApiProvider } from '../providers/join-api/join-api';
import { ToastProvider } from '../providers/toast/toast';
import { CheckMaintStatusProvider } from '../providers/check-maint-status/check-maint-status';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PingProvider,
    LoadingProvider,
    JoinApiProvider,
    ToastProvider,
    CheckMaintStatusProvider
  ]
})
export class AppModule {}
