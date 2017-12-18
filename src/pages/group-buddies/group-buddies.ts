import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
//import { UserProvider } from '../../providers/user/user';
import { GroupsProvider } from '../../providers/groups/groups';
import firebase from 'firebase';

/**
 * Generated class for the GroupBuddiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-buddies',
  templateUrl: 'group-buddies.html',
})
export class GroupBuddiesPage {
	public userList: Array<any>;
	public loadedUserList: Array<any>;
	public userRef: firebase.database.Reference;

  constructor(public navCtrl: NavController, 
							public navParams: NavParams, 
//							public userservice: UserProvider,
              public events: Events,
							public groupservice: GroupsProvider
	) {
		this.userRef = firebase.database().ref('userProfile');
		this.userRef.on('value', userList => {
			let users = [];
			userList.forEach( user => {
				users.push(user.val());
				return false;
			});

			this.userList = users;
			this.loadedUserList = users;
		});
	}

	initializeItems(): void {
		this.userList = this.loadedUserList;
	}

	getItems(searchbar) {
		// Reset items back to all of the items
		this.initializeItems();

		// set q to the value of the searchbar
		var q = searchbar.target.value;

		// if the value is an empty string don't filter the items
		if (!q) {
			return;
		}

		this.userList = this.userList.filter((v) => {
			if(v.displayName && q) {
				if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
					return true;
				}
				return false;
			}
		});

		console.log(q, this.userList.length);

	}
 
/*  ionViewWillEnter() {
    this.requestservice.getmyfriends();
    this.events.subscribe('gotintogroup', () => {
      this.myfriends.splice(this.myfriends.indexOf(this.newbuddy.uid), 1);
      this.tempmyfriends = this.myfriends;
    })
    this.events.subscribe('friends', () => {
      
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
      this.groupmembers = this.groupservice.currentgroup;
      for (var key in this.groupmembers)
        for (var friend in this.myfriends) {
          if (this.groupmembers[key].uid === this.myfriends[friend].uid)
            this.myfriends.splice(this.myfriends.indexOf(this.myfriends[friend]), 1);
        }
      this.tempmyfriends = this.myfriends;
    })
  }
 *//*
  searchuser(searchbar) {
    let tempfriends = this.tempmyfriends;
 
    var q = searchbar.target.value;
 
    if (q.trim() === '') {
      this.myfriends = this.tempmyfriends;
      return;
    }
 
    tempfriends = tempfriends.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
    
    this.myfriends = tempfriends;
 
  }*/
 
  addbuddy(buddy) {
    //this.newbuddy = buddy;
		console.log(buddy.displayName);
		console.log(buddy.key);
		console.log(buddy.uid);
    this.groupservice.addmember(buddy);
  }
 
}