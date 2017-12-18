import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupBuddiesPage } from './group-buddies';

@NgModule({
  declarations: [
    GroupBuddiesPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupBuddiesPage),
  ],
})
export class GroupBuddiesPageModule {}
