import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import * as GeoFire from "geofire";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import * as firebase from 'firebase';

@Injectable()
export class GeoProvider {

  geoDbRef: any;
  geoFire: any;

  hits = new BehaviorSubject([]);

  constructor(public afDatabase: AngularFireDatabase) {
    /// Reference database location for GeoFire
    this.geoDbRef = firebase.database().ref('dummyLocations');
    this.geoFire = new GeoFire(this.geoDbRef);
   }
   /// Adds GeoFire data to database
   setLocation(key:string, coords: Array<number>) {
     this.geoFire.set(key, coords)
         .then(_ => console.log('location updated'))
         .catch(err => console.log(err))
   }
   /// Queries database for nearby locations
   /// Maps results to the hits BehaviorSubject
   getLocations(radius: number, coords: Array<number>) {
		//this.geoFire.set("aaaa2", [-33.5, -70.9]);
    this.geoFire.query({
      center: coords,
      radius: radius
    })
    .on('key_entered', (key, location, distance) => {
			let ev = this.afDatabase.object('/dummyEvents/'+key);
			let hit = {
				key     : key,
        location: location,
        distance: distance,
				name		: '.',
				address	: '.',
				date		: '.',
				time		: '.'
      }
			ev.snapshotChanges().subscribe(action => {
				hit.name = action.payload.val().title;
				hit.address = action.payload.val().location;
				hit.date = action.payload.val().date;
				hit.time = action.payload.val().time;
				console.log(hit.key);
				console.log(hit.location);
				console.log(hit.distance);
				console.log(hit.name);
			});
      let currentHits = this.hits.value;
      currentHits.push(hit);
      this.hits.next(currentHits);
			
    })
   }
}