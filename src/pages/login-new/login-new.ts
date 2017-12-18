import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { usercreds } from '../../models/interfaces/usercreds';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider, public menuCtrl: MenuController, public alertCtrl: AlertController) {
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
 
}