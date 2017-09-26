import { AppHelperProvider } from './../../app/providers/app-helper';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Book } from '../../app/models/book';
import firebase from 'firebase'
import { User } from '../../app/models/user';

@Component({
  selector: 'page-sharebook',
  templateUrl: 'sharebook.html',
})
export class SharebookPage {

  book: Book = new Book();
  errors: string[] = [];
  cUser: User;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public appHelper: AppHelperProvider
  ) {

  }

  submitBook() {
    console.log(this.book)
    this.validateBook(this.book);
    // this.errors = this.validateBook(this.book);
    //If there is error;
    if (this.errors.length === 0) {
      this.saveBookToFirebase();
    }
  }

  validateBook(book: Book): string[] {
    console.log('making sure')
    var errors = []
    if (!book.title) {
      errors.push('Title is empty!')
    }
    if (!book.author) {
      errors.push('Author is empty!')
    }

    if (book.isbn && !this.isValidISBN(book.isbn)) {
      errors.push('ISBN seems invalid');
    }

    if (!book.summary) {
      errors.push('Summary is empty')
    }
    console.log(errors, 'string');
    return errors;
  }


  saveBookToFirebase() {
    var reqRef = firebase.database().ref('booklist/').push()
    this.book.uid = reqRef.key;
    // this.book.bookCreatorName = this.cUser.displayName;
    //this.book.bookCreatorUid = this.cUser.uid;
    this.appHelper.getCurrentUser().then((user: User) => {

    })
    reqRef.set(this.book).then(r => {

      this.toastCtrl.create({
        message: 'Your book has been submitted successfully.',
        duration: 4000,
        position: 'button',
        showCloseButton: true,
        dismissOnPageChange: false
      }).present();

      this.book = new Book();
    })
  }

  isValidISBN(isbn) {
    isbn = isbn.replace(/[^\dX]/gi, '');
    if (isbn.length != 10 || isbn.length != 13) {
      return false;
    }
    return isbn.length == 10 ? this.validate10DigitISBN(isbn) : this.validate13DigitISBN(isbn)
  }
  validate10DigitISBN(isbn) {
    var chars = isbn.split('');
    if (chars[9].toUpperCase() == 'X') {
      chars[9] = 10;
    }
    var sum = 0;
    for (var i = 0; i < chars.length; i++) {
      sum += ((10 - i) * parseInt(chars[i]));
    };
    return ((sum % 11) == 0);
  }

  validate13DigitISBN(isbn) {
    var coefficient = 1;
    var sum = 0;
    for (var i = 0; i < 12; i++) {
      sum += coefficient * (+isbn[i])
      coefficient = coefficient == 1 ? 3 : 1;
    }
    var r = 10 - (sum % 10);

    var x13 = r == 10 ? 0 : r;

    return isbn[12] == x13;
  }

}
