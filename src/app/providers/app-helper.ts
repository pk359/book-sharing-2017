import { Injectable, OnInit } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { FirebaseAuthUser, DatabaseUser } from '../models/user';
import { Book } from '../models/book';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

@Injectable()
export class AppHelperProvider implements OnInit {
  dbUser: DatabaseUser = new DatabaseUser();
  constructor() {
    this.managerUser();
  }

  ngOnInit() {
    // firebase.database().ref('users/' + this.dbUser.key).once('value', (snap) => {

    // })
  }

  private managerUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.database().ref('users/' + user.uid).on('value', (snap) => {
          if (snap.exists()) {
            Object.assign(this.dbUser, snap.val());
           
          } else {
            const newUser = new DatabaseUser();
            newUser.phoneNumber = user.phoneNumber
            newUser.displayName = user.displayName;
            newUser.email = user.email;
            newUser.photoURL = user.photoURL;
            newUser.key = user.uid;
            newUser.update().then(_ => {
              this.dbUser = newUser;
            })
          }
          this.dbUser = snap.val();
        })
      } else {
        this.dbUser = new DatabaseUser();
      }
    })
  }


  loginWithGooglePopup(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          resolve(true);
        }).catch(err => {
          reject(err)
        })
    })
  }
  logout() {
    firebase.auth().signOut();
  }


  updateProfile(data) : Promise<boolean> {
    //Get all the keys and value pair that we wish to update.
    return new Promise<boolean>((resolve, reject)=>{
      firebase.database().ref('users/'+ this.dbUser.key).update(data).then(_=>{
        resolve(true)
      }).catch(err=>{
        reject(err)
      })
    })
  }

  getMockBooks() {
    const objs = [
      {
        author: 'Satya Nadella',
        coverURLs: ['https://www.sephora.com/productimages/sku/s1828862-main-zoom.jpg'],
        ownerUid: 'Puf2UfmIRbMj1Jqv3CmJnNkAHNU2',
        summary: 'Good book and like it',
        title: 'Computer Science'
      },
      {
        author: 'Satya Nadella',
        coverURLs: ['https://www.sephora.com/productimages/sku/s1828862-main-zoom.jpg'],
        ownerUid: 'Puf2UfmIRbMj1Jqv3CmJnNkAHNU2',
        summary: 'Good book and like it',
        title: 'Computer Science'

      },
      {
        author: 'Prem Kumar',
        coverURLs: ['https://images-na.ssl-images-amazon.com/images/I/518l2awqcnL._SY445_QL70_.jpg'],
        ownerUid: 'Puf2UfmIRbMj1Jqv3CmJnNkAHNU2',
        summary: 'Good book and like it',
        title: 'Hit Sc'
      }
    ]

    return objs.map(obj => {
      const book = new Book();
      Object.assign(book, obj);
      return book;
    })
  }
}
