import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MapPage} from '../pages/map/map';
import { LoginNewPage } from '../pages/login-new/login-new';
import { ProfilePage} from '../pages/profile/profile';
import { GroupsPage} from '../pages/groups/groups';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage:any = LoginNewPage;
  
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
	
	this.pages = [
    { title: 'Home', component: HomePage },
	  { title: 'Map', component: MapPage},
		{ title: 'My Profile', component: ProfilePage},
		{ title: 'My Groups', component: GroupsPage}
    ];	
  }
  
  	openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
}

