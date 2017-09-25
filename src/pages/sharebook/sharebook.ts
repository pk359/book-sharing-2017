import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Book } from '../../app/models/book';
import firebase from 'firebase'
import { User } from '../../app/models/user';

@IonicPage()
@Component({
  selector: 'page-sharebook',
  templateUrl: 'sharebook.html',
})
export class SharebookPage {

  bookData: Book = new Book();
  error = '';
  cUser: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  }



  placeRequest() {
    this.error = '';
    // var noPhoto = false;
    if (this.bookData.title === '' ||
      this.bookData.summary === '' ||
      this.bookData.author === '') {
      this.error = 'All fields are necessary';
      //  } else if (this.photoHelper.photos.length == 0) {
      //    noPhoto = true
    }

    // if (this.error == '') {
    //   if (noPhoto) {
    //     this.alertCtrl.create({
    //       title: 'No Photo Attached',
    //       message: 'Place an order without photo?',
    //       buttons: [
    //         {
    //           text: 'YES',
    //           handler: () => {
    //             this.saveRequestToFirebase();
    //           }
    //         }, {
    //           text: 'NO'
    //         }
    //       ]
    //     }).present()
    //   } 
    else {
      this.saveBooklistToFirebase();
    }
    //   }
    // }
  }


  saveBooklistToFirebase() {

    var reqRef = firebase.database().ref('booklist/').push()
    this.bookData.key = reqRef.key;
    this.bookData.bookCreatorName = this.cUser.displayName;
    this.bookData.bookCreatorUid = this.cUser.uid;

    reqRef.set(this.bookData).then(r => {

      this.toastCtrl.create({
        message: 'Your book has been submitted successfully.',
        duration: 4000,
        position: 'button',
        showCloseButton: true,
        dismissOnPageChange: false
      }).present();

      this.bookData = new Book();
    })
  }




} // end of Sharebookpage
