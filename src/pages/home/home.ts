import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CreateEventPage } from '../create-event/create-event';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	email:string;
	pic:string;

  constructor(public navCtrl: NavController, private afDB: AngularFireDatabase
  	,private fire: AngularFireAuth ) {
  	this.email=fire.auth.currentUser.email;
  	this.pic=fire.auth.currentUser.photoURL;
  }

  gotoCreateEvent(){
  	this.navCtrl.push(CreateEventPage)
  }

}
