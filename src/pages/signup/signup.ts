import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, MenuController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  newuser = {
    email: '',
    password: '',
    displayName: '',
		date: new Date().toISOString().slice(0,10),
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider,
              public loadingCtrl: LoadingController, public toastCtrl: ToastController,	public menuCtrl: MenuController) {
  }
 
	ionViewWillEnter() {
		this.menuCtrl.swipeEnable( false );
  }

  ionViewDidLeave() {
		this.menuCtrl.swipeEnable( true );
  }

  signup() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '') {
      toaster.setMessage('All fields are required');
      toaster.present();
    }
    else if (this.newuser.password.length < 6) {
      toaster.setMessage('Password must be at least 6 characters long');
      toaster.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'Please wait'
      });
      loader.present();
      this.userservice.adduser(this.newuser).then((res: any) => {
        loader.dismiss();
        if (res.success)
          this.navCtrl.push('ProfilepicPage');
        else
          alert('Error' + res);
      })
    }
  }  
 
  goback() {
    this.navCtrl.setRoot('LoginPage');
  }
 
}