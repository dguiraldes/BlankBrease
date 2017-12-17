import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

   constructor(public http: Http)
   {
   }



   renderEvents() : Observable<any>
   {

      return new Observable(observer =>
      {
         let dummyEvents : any = [];
         firebase.database().ref('dummyEvents').orderByKey().once('value', (items : any) =>
         {
            items.forEach((item) =>
            {
               dummyEvents.push({
	              id        : item.key,
	              coords    : item.val().coords,
	              date      : item.val().date,
	              image     : item.val().image,
	              location  : item.val().location,
	              time      : item.val().time,	         
	              title     : item.val().title
	           });
            });

            observer.next(dummyEvents);
            observer.complete();
         },
         (error) =>
         {
            console.log("Observer error: ", error);
            console.dir(error);
            observer.error(error)
         });

      });
   }



   deleteEvent(id) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         let ref = firebase.database().ref('dummyEvents').child(id);
         ref.remove();
         resolve(true);
      });
   }



   addToDatabase(eventObj) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         let addRef = firebase.database().ref('dummyEvents');
         addRef.push(eventObj);
         resolve(true);
      });
   }



   updateDatabase(id, eventObj) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         var updateRef = firebase.database().ref('dummyEvents').child(id);
	      updateRef.update(eventObj);
         resolve(true);
      });
   }



   uploadImage(imageString) : Promise<any>
   {
      let image       : string  = 'event-' + new Date().getTime() + '.jpg',
          storageRef  : any,
          parseUpload : any;

      return new Promise((resolve, reject) =>
      {
         storageRef       = firebase.storage().ref('posters/' + image);
         parseUpload      = storageRef.putString(imageString, 'data_url');

         parseUpload.on('state_changed', (_snapshot) =>
         {
            // We could log the progress here IF necessary
            // console.log('snapshot progess ' + _snapshot);
         },
         (_err) =>
         {
            reject(_err);
         },
         (success) =>
         {
            resolve(parseUpload.snapshot);
         });
      });
   }


}
