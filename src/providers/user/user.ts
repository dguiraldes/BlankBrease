import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {

  firedata = firebase.database().ref('/userProfile');

  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {
  }

  adduser(newuser) {
    var promise = new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.afAuth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/blankbrease.appspot.com/o/generic-profile.jpg?alt=media&token=1a10402c-12fe-4dd9-bcc3-219cb585ed0b'
        }).then(() => {
					this.afDatabase.object(`/userProfile/${this.afAuth.auth.currentUser.uid}`).set({
						uid: this.afAuth.auth.currentUser.uid,
						displayName: newuser.displayName,
						photoURL: 'https://firebasestorage.googleapis.com/v0/b/blankbrease.appspot.com/o/generic-profile.jpg?alt=media&token=1a10402c-12fe-4dd9-bcc3-219cb585ed0b',
						creationDate: newuser.date
					}).then(() => {
            resolve({ success: true });
            }).catch((err) => {
              reject(err);
          })
          }).catch((err) => {
            reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

	passwordreset(email) {
    var promise = new Promise((resolve, reject) => {
      this.afAuth.auth.sendPasswordResetEmail(email).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

	updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
      this.afAuth.auth.currentUser.updateProfile({
        displayName: this.afAuth.auth.currentUser.displayName,
        photoURL: imageurl      
      }).then(() => {
        this.afDatabase.object(`/userProfile/${this.afAuth.auth.currentUser.uid}`).update({
//					displayName: this.afAuth.auth.currentUser.displayName,
					photoURL: imageurl,
//					uid: this.afAuth.auth.currentUser.uid
				}).then(() => {
					resolve({ success: true });
					}).catch((err) => {
						reject(err);
					})
			}).catch((err) => {
				reject(err);
      })  
    })
    return promise;
  }

	getuserdetails() {
		console.log('name'+this.afAuth.auth.currentUser.displayName);
    var promise = new Promise((resolve, reject) => {
    this.firedata.child(this.afAuth.auth.currentUser.uid).once('value', (snapshot) => {
      resolve(snapshot.val());
    }).catch((err) => {
      reject(err);
      })
    })
    return promise;
	}

	updatedisplayname(newname) {
    var promise = new Promise((resolve, reject) => {
      this.afAuth.auth.currentUser.updateProfile({
      displayName: newname,
      photoURL: this.afAuth.auth.currentUser.photoURL
    }).then(() => {
      this.afDatabase.object(`/userProfile/${this.afAuth.auth.currentUser.uid}`).update({
        displayName: newname,
//        photoURL: this.afAuth.auth.currentUser.photoURL,
//        uid: this.afAuth.auth.currentUser.uid
				}).then(() => {
					resolve({ success: true });
				}).catch((err) => {
					reject(err);
				})
			}).catch((err) => {
      reject(err);
			})
    })
    return promise;
  }

}