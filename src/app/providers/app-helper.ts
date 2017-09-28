import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { FirebaseAuthUser, DatabaseUser } from '../models/user';
import { Book } from '../models/book';


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


  getMockBooks() {

    var books: Book[] = [

      {
        author: 'Satya Nadella',
        coverURL: 'https://www.sephora.com/productimages/sku/s1828862-main-zoom.jpg',
        ownerUid: 'Puf2UfmIRbMj1Jqv3CmJnNkAHNU2',
        summary: 'Good book and like it',
        title: 'Computer Science'
      },
      {
        author: 'Satya Nadella',
        coverURL: 'https://www.sephora.com/productimages/sku/s1828862-main-zoom.jpg',
        ownerUid: 'Puf2UfmIRbMj1Jqv3CmJnNkAHNU2',
        summary: 'Good book and like it',
        title: 'Computer Science'

      },
      {
        author: 'Prem Kumar',
        coverURL: 'https://images-na.ssl-images-amazon.com/images/I/518l2awqcnL._SY445_QL70_.jpg',
        ownerUid: 'Puf2UfmIRbMj1Jqv3CmJnNkAHNU2',
        summary: 'Good book and like it',
        title: 'Hit Sc'
      }
    ]
    return books;
  }


}
