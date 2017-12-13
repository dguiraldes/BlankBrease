import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { usercreds } from '../../models/interfaces/usercreds';
 
/*
  Generated class for the AuthProvider provider.
 
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {
  
  constructor(public afireauth: AngularFireAuth) {
 
  }
/*
    For logging in a particular user. Called from the login.ts file.
  
*/   
  login(credentials: usercreds) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
       })
    })
    return promise; 
  }

	logout(): Promise<void> {
    return this.afireauth.auth.signOut();
  }
 
}