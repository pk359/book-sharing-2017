import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SharebookPage } from '../sharebook/sharebook';
import { User } from '../../app/models/user';

import firebase from 'firebase'

/**
 * Generated class for the LibraryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage {

  cUser: User = new User;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LibraryPage');
  }


  checkIfUser() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        return true;
      } else {
        return false;
      }
    });
  }


  openSharebookPage() {
    this.navCtrl.push(SharebookPage, {})
  }

}
