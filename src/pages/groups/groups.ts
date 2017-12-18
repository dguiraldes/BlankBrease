import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';

/**
 * Generated class for the GroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
	allmygroups;
	
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
              public loadingCtrl: LoadingController, public groupservice: GroupsProvider) {
  }
	
	ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Getting your groups, please wait...'
    });
    loader.present();
    this.groupservice.getmygroups();
    loader.dismiss();
    this.events.subscribe('allmygroups', () => {
      this.allmygroups = this.groupservice.mygroups;
    })
  }
 
  ionViewDidLeave() {
    this.events.unsubscribe('allmygroups');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupsPage');
  }

	addGroup() {
    this.navCtrl.push('NewGroupPage');
  }

	openGroup(group) {
    this.groupservice.getintogroup(group.groupKey);
		console.log(group.groupKey)
    this.navCtrl.push('GroupInfoPage', { groupId: group.groupKey });
  }

}
