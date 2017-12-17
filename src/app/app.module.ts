import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CreateEventPage } from '../pages/create-event/create-event';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ImageProvider } from '../providers/image/image';
import { PreloaderProvider } from '../providers/preloader/preloader';
import { DatabaseProvider } from '../providers/database/database';


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
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreateEventPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImageProvider,
    PreloaderProvider,
    DatabaseProvider
  ]
})
export class AppModule {}
