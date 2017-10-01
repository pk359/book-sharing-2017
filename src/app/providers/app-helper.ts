import { Injectable, OnInit } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { FirebaseAuthUser, DatabaseUser } from '../models/user';
import { Book } from '../models/book';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

import { Events, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class AppHelperProvider {
  user: FirebaseAuthUser
  constructor(
    public events: Events,
    public storage: Storage,
    private alertCtrl: AlertController
  ) {
    this.managerUser();
  }

  // getCurrentUser(): Promise<firebase.UserInfo>{
  //   return new Promise<firebase.UserInfo>(resolve=>{
  //     resolve()
  //   })
  // }

  managerUser() {
    console.log('here');
    firebase.auth().onAuthStateChanged((user: firebase.UserInfo) => {
      if (user) {
        this.user = firebase.auth().currentUser;
        this.events.publish('user:loggedIn', user);
        let userRef = firebase.database().ref('users/' + user.uid);
        userRef.once('value', (snap) => {
          if (!snap.exists()) {
            userRef.set(user);
          }
        })
      }
      else {
        this.user = null;
        this.events.publish('user:loggedOut');
      }
    })
  }

  getDBUser(): Promise<DatabaseUser> {
    return new Promise<DatabaseUser>(resolve => {
      firebase.database().ref(`users/${this.user.uid}`).once('value', snap => {
        resolve(snap.val());
      })
    })
  }

  async alertUserToLogin() {
    return new Promise<firebase.UserInfo>(resolve=>{
      const alert = this.alertCtrl.create({
        title: 'Please login...',
        message: 'You need to login to access this page.',
        buttons: [
          // {
          //   text: 'Cancel',
          //   role: 'cancel',
          // },
          {
            text: 'Okay',
          
            // handler: () => {
            //   this.loginWithGooglePopup().then(res => {
            //     resolve(firebase.auth().currentUser)
            //   });
            // }
          }
        ]
      });
      alert.present();
    })
   
  }
  loginWithGooglePopup(): Promise<FirebaseAuthUser> {
    return new Promise((resolve, reject) => {
      firebase.auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          this.user = firebase.auth().currentUser;
          this.storage.set('currentUser', JSON.stringify(this.user));
          resolve(this.user);
        }).catch(err => {
          reject(err)
        })
    })
  }

  logout() {
    firebase.auth().signOut().then(_=>{
      this.storage.remove('currentUser');
    })
  }


  updateProfile(data): Promise<boolean> {
    //Get all the keys and value pair that we wish to update.
    return new Promise<boolean>((resolve, reject) => {
      firebase.database().ref('users/' + this.user.uid).update(data).then(_ => {
        resolve(true)
      }).catch(err => {
        reject(err)
      })
    })
  }

  getBooks(): Promise<Book[]> {
    return new Promise<Book[]>((resolve, reject) => {
      firebase.database().ref('books').once('value', snap => {
        if (snap.exists()) {
          console.log(Object.keys(snap.val()).map(key => { return snap.val()[key] }))
          resolve(Object.keys(snap.val()).map(key => { return snap.val()[key] }))
        }
      })
    })
  }
}
