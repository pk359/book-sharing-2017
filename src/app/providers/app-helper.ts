import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { FirebaseAuthUser, DatabaseUser } from '../models/user';


@Injectable()
export class AppHelperProvider {

  constructor() {

  }

  getCurrentFireAuthUser(): Promise<FirebaseAuthUser> {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((user: FirebaseAuthUser) => {
        console.log(user);
        resolve(user);
      })
    })
  }

  loginWithGooglePopup(): Promise<DatabaseUser> {
    return new Promise((resolve, reject) => {
      firebase.auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          let dbUser = this.getDBUserModel(res['user']);
          resolve(dbUser);
        }).catch(err => {
          reject(err)
        })
    })
  }
  logout() {
    firebase.auth().signOut();
  }

  doesUserExist(user: FirebaseAuthUser): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`users/${user.uid}`).once('value', snap => {
        if (snap.val()) {
          resolve(true)
        }
        resolve(false);
      })
    })



  }
  getDBUserModel(responseFromFirebaseAuth: firebase.User) {
    let user = new DatabaseUser();
    user.phoneNumber = responseFromFirebaseAuth.phoneNumber;
    user.displayName = responseFromFirebaseAuth.displayName;
    user.email = responseFromFirebaseAuth.email;
    user.photoURL = responseFromFirebaseAuth.photoURL;

    return user;
  }

  createUserInFirebase(user: DatabaseUser, authUser: FirebaseAuthUser) {
    console.log(user)
    return new Promise((resolve, reject) => {
      firebase.database().ref(`users/${authUser.uid}`).set(user).then(_ => {
        resolve('user created');
      }).catch(err => {
        reject(err)
      })
    })
  }


}
