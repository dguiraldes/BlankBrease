import { Component} from '@angular/core';
import { GeoProvider } from '../../providers/geo/geo';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
//testing
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

	lat: number;
	lng: number;
	markers: any;
  subscription: any;

	//testing
	eventRef: AngularFireList<any>;

  constructor(
		private geo: GeoProvider,
		public navCtrl: NavController,
		public alertCtrl: AlertController,
		public database: AngularFireDatabase,	//testing
		private nativeGeocoder: NativeGeocoder,
		public platform: Platform
	) {
		this.getUserLocation();
    this.subscription = this.geo.hits
        .subscribe(hits => this.markers = hits);
		//testing
		this.eventRef = this.database.list('dummyEvents');
 }

  private getUserLocation() {
		/// locate the user
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
				console.log(this.lat+'-'+this.lng);

				this.geo.getLocations(500, [this.lat, this.lng]);
      });
    }
  }

//testing
	createEvent(){
    let newEventModal = this.alertCtrl.create({
      title: 'New Dummy Event',
      message: "Enter data",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
				{
          name: 'date',
          placeholder: 'Date'
        },
				{
          name: 'time',
          placeholder: 'Time'
        },
				{
          name: 'location',
          placeholder: 'Location'
        },
				{
          name: 'lat',
          placeholder: 'lat'
        },
				{
          name: 'lng',
          placeholder: 'lng'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
						if (this.platform.is('cordova')) {
							this.nativeGeocoder.forwardGeocode(data.location+', Chile').then((coordinates: NativeGeocoderForwardResult) => {
								console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude);
								data.lat = coordinates.latitude;
								data.lng = coordinates.longitude;
								console.log(data.lat);
								console.log(data.lng);
								let newEv = this.eventRef.push({
									title: data.title,
									time: data.time,
									location: data.location,
									date: data.date,
									coords: [parseFloat(data.lat), parseFloat(data.lng)]
								});
								this.geo.setLocation(newEv.key, [parseFloat(data.lat), parseFloat(data.lng)]);
								}).catch((error: any) => console.log(error));
							
						} else {
							let newEv = this.eventRef.push({
								title: data.title,
								time: data.time,
								location: data.location,
								date: data.date,
								coords: [parseFloat(data.lat), parseFloat(data.lng)]
							});
							this.geo.setLocation(newEv.key, [parseFloat(data.lat), parseFloat(data.lng)]);
						}
          }
        }
      ]
    });
    newEventModal.present( newEventModal );
	}
}
