import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	@ViewChild('username') user;
	@ViewChild('password') password;

  constructor(private fire: AngularFireAuth, public navCtrl: NavController, 
  	public navParams: NavParams, public alertCtrl: AlertController) {
  }

  alert(errorType:string,message:string){
  	this.alertCtrl.create({
		title: errorType,
		subTitle: message,
		buttons: ['OK']
	}).present();	
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
  		this.fire.auth.createUserWithEmailAndPassword(this.user.value,this.password.value)
  		.then(data=>{
  			this.alert('Cool','You were sucsessfully registered');
  			this.navCtrl.setRoot(HomePage);
  		})
  		.catch(error=>{
  			this.alert('Invalid email',error.message);
  		})
  }

}
