import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginNewPage } from './login-new';

@NgModule({
  declarations: [
    LoginNewPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginNewPage),
  ],
})
export class LoginNewPageModule {}
