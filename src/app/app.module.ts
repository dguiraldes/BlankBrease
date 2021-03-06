import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AgmCoreModule } from '@agm/core';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CreateEventPage } from '../pages/create-event/create-event';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MapPage} from '../pages/map/map';
import { LoginNewPage } from '../pages/login-new/login-new';
import { ProfilePage } from '../pages/profile/profile';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GeoProvider } from '../providers/geo/geo';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';


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
		MapPage,
		LoginNewPage,
		ProfilePage
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
		MapPage,
		LoginNewPage,
		ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
		File,
    FilePath,
		FileChooser,
    GeoProvider,
    AuthProvider,
    UserProvider,
    ImghandlerProvider
  ]
})
export class AppModule {}
