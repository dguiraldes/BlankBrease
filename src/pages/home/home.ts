import { Component } from '@angular/core';

import { NavController, Platform, ModalController } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/database/database';

// import { ModalsPage } from '../modals/modals';

import { CreateEventPage } from '../create-event/create-event';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	email:string;
	pic:string;
  public events    : any;

  constructor(public navCtrl: NavController, 
              private afDB: AngularFireDatabase,
              private fire: AngularFireAuth,
              private platform     : Platform,
              private modalCtrl    : ModalController,
              private _IMG         : ImageProvider,
              private _LOADER      : PreloaderProvider,
              private _DB          : DatabaseProvider
              ) {
		console.log(fire.auth.currentUser.photoURL);
		console.log(fire.auth.currentUser.displayName);
  	this.email=fire.auth.currentUser.email;
  	this.pic=fire.auth.currentUser.photoURL;
  }

ionViewDidEnter()
   {
      this._LOADER.displayPreloader();
      this.platform.ready()
      .then(() =>
      { this.loadAndParseEvents();

      });
   }

loadAndParseEvents()
   {
      this.events = this._DB.renderEvents();
      this._LOADER.hidePreloader();
   }

deleteEvent(event)
   {
      this._DB.deleteEvent(event.id)
      .then((data) =>
      {
         this.loadAndParseEvents();
      });
   }

   editEvent(event)
   {
      let params = { event: event, isEdited: true },
          modal  = this.modalCtrl.create('ModalsPage', params);

      modal.onDidDismiss((data) =>
      {
         if(data)
         {
            this.loadAndParseEvents();
         }
      });
      modal.present();
   }

   addEvent()
   {
      let modal = this.modalCtrl.create('ModalsPage');
      modal.onDidDismiss((data) =>
      {
         if(data)
         {
            this.loadAndParseEvents();
         }
      });
      modal.present();
   }


  gotoCreateEvent(){
  	this.navCtrl.push(CreateEventPage)
  }

}
