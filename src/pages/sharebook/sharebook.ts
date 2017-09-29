import { AppHelperProvider } from './../../app/providers/app-helper';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Book } from '../../app/models/book';
import firebase from 'firebase'
import { DatabaseUser } from '../../app/models/user';
@IonicPage()
@Component({
  selector: 'page-sharebook',
  templateUrl: 'sharebook.html',
})
export class SharebookPage {
  selectedFiles: File[]
  book: Book = new Book();
  errors: string[] = [];

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private appHelper: AppHelperProvider,
    private alertCtrl: AlertController
  ) {
   
  }

  getUser(){
    return this.appHelper.dbUser;
  }

  async submitBook(bookForm) {
    this.errors = this.validateBook(this.book);
    if(!this.validateImages(this.selectedFiles)){
      this.errors.push('Only images types allowed');
    }
    if (this.errors.length === 0) {
      //File is valid, book is valid

      console.log(this.book, this.selectedFiles)
      /*
      There is no error, so let us save image to firebase quickly. and get url to image
      */
      let alert = this.alertCtrl.create({
        title: 'loading...',
        message: 'loading book in database'
      })
      alert.present();

      try {
        await this.book.save(this.selectedFiles, this.getUser());
        Object.keys(this.book).forEach(key => {
          this.book[key] = ''
        })
        this.selectedFiles = null;
        alert.dismiss()
      } catch (err) {
        console.error(err)
      }
    }
  }

  validateBook(book: Book): string[] {
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
  validateImages(files) : boolean{
    let allowedFileTypes = ["image/gif", "image/jpeg", "image/png"];
    files.forEach(file=>{
      if(allowedFileTypes.indexOf(file['type']) < 0 ){
        return false;
      }
    })
    return true;
  }

  onFileChange(event) {
    this.selectedFiles =
      Object.keys(event.target.files)
        .filter(key => {
          return key !== 'length';
        }).map(key => {
          return event.target.files[key];
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
