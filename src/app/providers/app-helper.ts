import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { User } from '../models/user';


@Injectable()
export class AppHelperProvider {

  constructor() {

  }

  getCurrentUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: User) => {
        resolve(user);
      })
    })
  }

  loginWithGooglePopup(): Promise<User> {
    return new Promise((resolve, reject) => {
      firebase.auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          resolve(res['user'])
        }).catch(err => {
          reject(err)
        })
    })
  }
  logout(){
    firebase.auth().signOut();
  }
}
