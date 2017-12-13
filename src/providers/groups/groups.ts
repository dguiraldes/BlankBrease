import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

/*
  Generated class for the GroupsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroupsProvider {
  firegroup = firebase.database().ref('/groups');
  mygroups: Array<any> = [];

  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase, public events: Events) {
  }
 
  addgroup(newGroup) {
    var promise = new Promise((resolve, reject) => {
      this.afDatabase.object(`/groups/${this.afAuth.auth.currentUser.uid}/${newGroup.groupName}`).set({
        groupimage: newGroup.groupPic,
        msgboard: '',
        owner: this.afAuth.auth.currentUser.uid
      }).then(() => {
        resolve(true);
        }).catch((err) => {
          reject(err);
      })
    });
    return promise;
  }

	getmygroups() {
    this.firegroup.child(this.afAuth.auth.currentUser.uid).once('value', (snapshot) => {
      this.mygroups = [];
      if(snapshot.val() != null) {
        var temp = snapshot.val();
        for (var key in temp) {
          var newgroup = {
            groupName: key,
            groupimage: temp[key].groupimage
          }
          this.mygroups.push(newgroup);
        }
      }
      this.events.publish('allmygroups');
    })
  }

	getOwnership(groupName) {
    var promise = new Promise((resolve, reject) => {
      this.firegroup.child(this.afAuth.auth.currentUser.uid).child(groupName).once('value', (snapshot) => {
        var temp = snapshot.val().owner;
        if (temp == this.afAuth.auth.currentUser.uid) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      }).catch((err) => {
          reject(err);
      })
    })
    return promise;
  }

}
