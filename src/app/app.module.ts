import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AgmCoreModule } from '@agm/core';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CreateEventPage } from '../pages/create-event/create-event';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MapPage} from '../pages/map/map';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GeoProvider } from '../providers/geo/geo';


export const firebaseConfig = {
    apiKey: "AIzaSyBUkpKTWuriOn1NHv1EfSCgOCO2ofjsTmU",
    authDomain: "blankbrease.firebaseapp.com",
    databaseURL: "https://blankbrease.firebaseio.com",
    projectId: "blankbrease",
    storageBucket: "blankbrease.appspot.com",
    messagingSenderId: "562848512148"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreateEventPage,
    LoginPage,
    RegisterPage,
	MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
	AgmCoreModule.forRoot({
		apiKey: "AIzaSyDT2aviXJCQgK3C9A_tV0nPAM-6euS_Lb8"
	})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreateEventPage,
    LoginPage,
    RegisterPage,
	MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeoProvider
  ]
})
export class AppModule {}
