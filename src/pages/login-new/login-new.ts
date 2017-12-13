import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { usercreds } from '../../models/interfaces/usercreds';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * Generated class for the LoginNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-new',
  templateUrl: 'login-new.html',
})
export class LoginNewPage {

  credentials = {} as usercreds;
  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider, public menuCtrl: MenuController, public alertCtrl: AlertController) {
  }

	ionViewWillEnter() {
		this.menuCtrl.swipeEnable( false );
  }

  ionViewDidLeave() {
		this.menuCtrl.swipeEnable( true );
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

	alert(errorType:string,message:string){
  	this.alertCtrl.create({
		title: errorType,
		subTitle: message,
		buttons: ['OK']
	}).present();	
  }
 
  signin() {
    this.authservice.login(this.credentials).then(data=>{
  			this.alert('Cool','You\'re logged in');
  			this.navCtrl.setRoot(HomePage);
  		})
  		.catch(error=>{ 
  			this.alert('There was an error',error.message);	
		})
  }
 
  passwordreset() {
		this.navCtrl.push('PasswordResetPage');
  }
   
  signup() {
		this.navCtrl.push('SignupPage');
  }

	signInWithFacebook() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(data => {
      	this.navCtrl.setRoot(HomePage);
      	//this.ref.detectChanges();
      })
  }
 
}