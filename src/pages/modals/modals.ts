import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';

/**
 * Generated class for the ModalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modals',
  templateUrl: 'modals.html',
})
export class ModalsPage{
   
   public form             : any;
   public events           : any;
   public eventTitle       : any     = '';
   public eventImage       : any     = '';
   public eventImage2      : any     = '';
   public eventCoords      : any     = [];
   public eventDate        : string = new Date().toISOString();
   public eventLocation    : any     = '';
   public eventTime        : string     = '00:00';
   public eventId          : string  = '';
   public isEditable       : boolean = false;
  
  constructor(
      public navCtrl        : NavController,
      public params         : NavParams,
      private _FB 	        : FormBuilder,
      private _IMG          : ImageProvider,
      public viewCtrl       : ViewController,
      private _LOADER       : PreloaderProvider,
      private _DB           : DatabaseProvider
   ){
   	this.form 		= _FB.group({
         'title' 		: ['', Validators.required],
         'time' 		: ['', Validators.required],
         'location'		: ['', Validators.required],
         'date'			: ['', Validators.required],
         'image' 		: ['', Validators.required]

      });

   	this.events = firebase.database().ref('dummyEvents/');

   	if(params.get('isEdited'))
      {
          let event 	    = params.get('event'),
              k;

          this.eventTitle	    = event.title;
          this.eventTime	    = event.time
          this.eventLocation   	= event.location;
          this.eventCoords  	= event.coords;
          this.eventDate   	    = event.date;
          this.eventImage       = event.image;
          this.eventImage2      = event.image;
          this.eventId          = event.id;


          for(k in event.coords)
          {
             this.eventCoords.push(event.coords[k].name);
          }

          this.isEditable      = true;
      }
   }
  


 saveEvent(val){
      this._LOADER.displayPreloader();

      let title	    : string		= this.form.controls["title"].value,
  		  time  	: any 			= this.form.controls["time"].value,
  		  location 	: string	    = this.form.controls["location"].value,
  		  date  	: string		= this.form.controls["date"].value,
  		  coords  	: any	     	= this.form.controls["coords"].value,
  		  image     : string        = this.eventImage2,
  		  types     : any           = [],
  		  people    : any           = [],
  		  k         : any;


      for(k in coords)
      {
         types.push({
            "name" : coords[k]
         });
      }


      if(this.isEditable)
      {

         if(image !== this.eventImage)
         {
            this._DB.uploadImage(image)
            .then((snapshot : any) =>
            {
               let uploadedImage : any = snapshot.downloadURL;

               this._DB.updateDatabase(this.eventId,
               {
	              title    : title,
	              time     : time,
	              location : location,
	              image    : uploadedImage,
	              coords   : types,
	              date     : date
	           })
               .then((data) =>
               {
                  this._LOADER.hidePreloader();
               });

            });
         }
         else
         {

           this._DB.updateDatabase(this.eventId,
           {
	              title    : title,
	              time     : time,
	              location : location,
	              coords   : types,
	              date     : date
	       })
           .then((data) =>
           {
              this._LOADER.hidePreloader();
           });
	     }

      }
      else
      {
         this._DB.uploadImage(image)
         .then((snapshot : any) =>
         {
            let uploadedImage : any = snapshot.downloadURL;

            this._DB.addToDatabase({
	              title    : title,
	              time     : time,
	              location : location,
	              image    : uploadedImage,
	              coords   : types,
	              date     : date
	        })
            .then((data) =>
            {
               this._LOADER.hidePreloader();
            });
         });

      }
      this.closeModal(true);
   }

   closeModal(val = null){
   this.viewCtrl.dismiss(val);
	}

    selectImage(){
      this._IMG.selectImage()
      .then((data) =>
      {
         this.eventImage2 = data;
      });
   }

}


