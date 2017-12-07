import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	@ViewChild('username') user;
	@ViewChild('password') password;


  constructor(public navCtrl: NavController, private fire: AngularFireAuth, 
  	public alertCtrl: AlertController, public ref: ChangeDetectorRef ){
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

  signIn(){
  	this.fire.auth.signInWithEmailAndPassword(this.user.value,this.password.value)
  		.then(data=>{
  			this.alert('Cool','You\'re logged in');
  			this.navCtrl.setRoot(HomePage);
  		})
  		.catch(error=>{ 
  			this.alert('There was an error',error.message);	
		})
  	

  }
  gotoHome(){
  	if(this.loggedIn==true){
  		this.alert('funciona','')
  		this.navCtrl.setRoot(HomePage);
  	}
  }

   register(){
  	this.navCtrl.push(RegisterPage);
  }

  signInWithFacebook() {
    this.fire.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(data => {
      	this.navCtrl.setRoot(HomePage);

      	this.ref.detectChanges();

      })

  }
}
