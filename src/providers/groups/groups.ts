import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

/*
  Generated class for the GroupsProvi0d0er provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroupsProvider {
	userdb = firebase.database().ref('/userProfile');
  firegroup = firebase.database().ref('/groups');
  mygroups: Array<any> = [];
	currentgroup: Array<any> = [];
  currentgroupkey;
	currentgroupname;
  grouppic;
	groupmsgs;
	

  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase, public events: Events) {
		
  }
 
  addgroup(newGroup) {
    var promise = new Promise((resolve, reject) => {
			var group = this.afDatabase.list('groups').push({
				name: newGroup.groupName,
				image: newGroup.groupPic,
				owner: this.afAuth.auth.currentUser.uid
			})
			this.afDatabase.object(`/groups/${group.key}/members/${this.afAuth.auth.currentUser.uid}`).set("true");
			this.afDatabase.object(`/userProfile/${this.afAuth.auth.currentUser.uid}/groups/${group.key}`).set("true");
			resolve(true);
		})
		console.log(promise);
    return promise;
  }

	getmygroups() {
		this.userdb.child(this.afAuth.auth.currentUser.uid).child('groups').once('value', (snapshot) => {
			this.mygroups = [];
			if(snapshot.val() != null) {
				var temp = snapshot.val();
				for (var key in temp) {
					this.firegroup.child(key).once('value', (group) => {
						var newGroup = {
						groupKey : group.key,
						groupName : group.val().name,
						groupImage : group.val().image
						};
						console.log(group.val().name + '=' + newGroup.groupKey);
						console.log(group.val().name + '=' + group.key);/*
						newGroup.groupName = group.val().name;
						newGroup.groupImage = group.val().image;*/
						this.mygroups.push(newGroup);
					})
				}
			}
			this.events.publish('allmygroups');
		});
	}

	getGroupName(groupKey) {
    this.firegroup.child(groupKey).once('value', (snapshot) => {
      var temp = snapshot.val().name;
			this.currentgroupname = temp;
    })
	}
	
	getOwnership(groupKey) {
    var promise = new Promise((resolve, reject) => {
      this.firegroup.child(groupKey).once('value', (snapshot) => {
        var temp = snapshot.val().owner;
        if (temp == this.afAuth.auth.currentUser.uid) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      })
    })
    return promise;
  }

	getintogroup(groupKey) {
    if (groupKey != null) {
      this.firegroup.child(groupKey).once('value', (snapshot) => {
				var temp = snapshot.val();
				this.currentgroupname = temp.name;
				this.currentgroupkey = groupKey;
				this.events.publish('gotintogroup');
				console.log(groupKey+'='+this.currentgroupname);
			})
    }
  }

	getgroupmembers(groupKey) {
		this.firegroup.child(groupKey).child('members').once('value', (snapshot) => {
			this.currentgroup = [];
			if(snapshot.val() != null) {
				var temp = snapshot.val();
				for (var key in temp) {
					console.log('member='+key)
					this.userdb.child(key).once('value', (member) => {
						var newMember = {
						memberKey : member.key,
						displayName : member.val().displayName,
						photoURL : member.val().photoURL
						};
						console.log(member.val().displayName);/*
						newMember.memberName = member.val().name;
						newMember.memberImage = member.val().image;*/
						this.currentgroup.push(newMember);
					})
				}
			}
			this.events.publish('gotmembers');
		});
	}
/*
    this.firegroup.child(groupKey).child(members).once('value', (snapshot) => {
      var tempdata = snapshot.val().owner;
      this.firegroup.child(tempdata).child(this.currentgroupname).child('members').once('value', (snapshot) => {
        var tempvar = snapshot.val();
        for (var key in tempvar) {
          this.currentgroup.push(tempvar[key]);
        }
      })
    })
    this.events.publish('gotmembers');*/

	getgroupimage() {
    return new Promise((resolve, reject) => {
      this.firegroup.child(this.afAuth.auth.currentUser.uid).child(this.currentgroupname).once('value', (snapshot) => {
        this.grouppic = snapshot.val().groupimage;
        resolve(true);
    })
    })
    
  }

  addmember(newMember) {
		var ref = this.firegroup.child(this.currentgroupkey).child('members').child(newMember.uid).once('value', (snapshot) => {
      if(snapshot.val() == null) {
				this.afDatabase.object(`/groups/${this.currentgroupkey}/members/${newMember.uid}`).set("true");
				this.afDatabase.object(`/userProfile/${newMember.uid}/groups/${this.currentgroupkey}`).set("true");
			}
			else {
				console.log('User already in group');
			}
    })
	}

/*
    this.firegroup.child(this.currentgroupkey).child('members').push(newMember).then(() => {
      this.getgroupimage().then(() => {
        this.firegroup.child(newMember.uid).child(this.currentgroupname).set({
          groupimage: this.grouppic,
          owner: this.afAuth.auth.currentUser.uid,
          msgboard: ''
        }).catch((err) => {
          console.log(err);
        })
      })
      this.getintogroup(this.currentgroupname);
    })
  }
*/
	deletemember(member) {
    this.firegroup.child(this.afAuth.auth.currentUser.uid).child(this.currentgroupname)
      .child('members').orderByChild('uid').equalTo(member.uid).once('value', (snapshot) => {
        snapshot.ref.remove().then(() => {
          this.firegroup.child(member.uid).child(this.currentgroupname).remove().then(() => {
            this.getintogroup(this.currentgroupname);
          })
        })
      })
  }

}
