import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Events, LoadingController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';

/**
 * Generated class for the GroupInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-info',
  templateUrl: 'group-info.html',
})
export class GroupInfoPage {

  owner: boolean = false;
	groupId;
  groupName;
	groupMembers;
  constructor(public navCtrl: NavController, 
							public navParams: NavParams, 
							public groupservice: GroupsProvider,
							public actionSheet: ActionSheetController, 
							public loadingCtrl: LoadingController,
							public events: Events) 
	{
    this.groupId = this.navParams.get('groupId');
		this.groupservice.getGroupName(this.groupId);
    this.groupservice.getOwnership(this.groupId).then((res) => {
      if (res)
        this.owner = true;  
    }).catch((err) => {
      alert(err);
    })
  }
 
	ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: 'Getting members, please wait...'
    });
    loader.present();
    this.groupservice.getgroupmembers(this.groupId);
    loader.dismiss();
    this.events.subscribe('gotmembers', () => {
      this.groupMembers = this.groupservice.currentgroup;
    })
		this.groupName = this.groupservice.currentgroupname;
  }

/*
  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupInfoPage');
		this.groupservice.getOwnership(this.groupName).then((res) => {
      if (res)
        this.groupMembers = this.groupservice.currentgroup;
      else {
        this.groupservice.getgroupmembers();
      }
    })
    this.events.subscribe('gotmembers', () => {
      this.groupMembers = this.groupservice.currentgroup;
    })
  }
 */
  presentOwnerSheet() {
    let sheet = this.actionSheet.create({
      title: 'Group Actions',
      buttons: [
        {
          text: 'Add member',
          icon: 'person-add',
          handler: () => {
            this.navCtrl.push('GroupBuddiesPage');
          }
        },
        {
          text: 'Remove member',
          icon: 'remove-circle',
          handler: () => {
            this.navCtrl.push('GroupMembersPage');
          }
        },
        {
          text: 'Group Info',
          icon: 'person',
          handler: () => {
            this.navCtrl.push('GroupInfoPage', {groupName: this.groupName});
          }
        },
        {
          text: 'Delete Group',
          icon: 'trash',
          handler: () => {
            //this.groupservice.deletegroup();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    })
    sheet.present();
  }
 
  presentMemberSheet() {
    let sheet = this.actionSheet.create({
      title: 'Group Actions',
      buttons: [
        {
          text: 'Leave Group',
          icon: 'log-out',
          handler: () => {
            //this.groupservice.leavegroup();
          }
        },
        {
          text: 'Group Info',
          icon: 'person',
          handler: () => {
            this.navCtrl.push('GroupInfoPage', {groupName: this.groupName});
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    })
    sheet.present();
  }

}
