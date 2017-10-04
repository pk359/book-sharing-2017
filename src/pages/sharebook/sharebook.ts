import { AppHelperProvider } from './../../app/providers/app-helper';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Book } from '../../app/models/book';
import { DatabaseUser } from '../../app/models/user';
import { Events } from 'ionic-angular'
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
@IonicPage()
@Component({
  selector: 'page-sharebook',
  templateUrl: 'sharebook.html',
})
export class SharebookPage {
  @ViewChild('files') filesRef: ElementRef;
  @ViewChild('preview') previewRef: ElementRef;
  selectedFiles: any = []
  book: Book = new Book();
  errors: string[] = [];

  user: any;
  constructor(
    private _sanitizer: DomSanitizer,
    public navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private appHelper: AppHelperProvider,
    private alertCtrl: AlertController,
    public events: Events,
    public storage: Storage,
    public elmRef: ElementRef
  ) {
    this.events.subscribe('user:loggedIn', (res) => {
      console.log('user is logged in. i m just fucking up')
      this.user = res;
    })
    this.events.subscribe('user:loggedOut', (res) => {
      this.user = null;
    })
  }

  sanitize(content) {
    // return this._sanitizer.bypassSecurityTrustResourceUrl(`${content}`);
  }
  ionViewCanEnter(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.storage.get('currentUser').then(res => {
        var currentUser = JSON.parse(res);
        if (currentUser) {
          resolve(true)
        } else {
          resolve(false)
          this.appHelper.alertUserToLogin()
        }
      })
    })
  }


  ionViewDidLoad() {
    this.user = this.appHelper.user;
  }
  getUser() {
    return this.appHelper.user;
  }

  async submitBook(bookForm) {
    this.errors = this.validateBook(this.book);
    if (this.selectedFiles.length > 0 && !this.validateImages(this.selectedFiles)) {
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
        await this.book.save(this.selectedFiles, this.user);
        // Object.keys(this.book).forEach(key => {
        //   this.book[key] = ''
        // })
        // this.selectedFiles = null;
        alert.dismiss()
        //Create a toast to tell user file has been uploaded
        const toast = this.toastCtrl.create({
          message: 'Book was added successfully',
          duration: 3000,
          position: 'middle'
        });
        this.navCtrl.setRoot('LibraryPage');
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
  validateImages(files): boolean {

    files.forEach(file => {
      if (! /\.(jpe?g|png|gif)$/i.test(file.name)) {
        return false;
      }
    })
    return true;
  }

  onFileChange(event) {

    // function getThumb(file) {

    //   var thumb: any


    //   // return thumb;
    // }
    this.selectedFiles =
      Object.keys(event.target.files)
        .filter(key => {
          return key !== 'length';
        }).map(key => {
          let fileObj = { 'file': event.target.files[key] };

          var reader = new FileReader();
          reader.addEventListener("load", (file) =>{
            var thumb = new Image();
            thumb.height = 100;
            thumb.title = event.target.files[key].name;
            thumb.src = file.toString();
            fileObj['thumb'] = thumb;
          }, false)
          reader.readAsDataURL(event.target.files[key])
          return fileObj;
          // return event.target.files[key];
        })
    console.log(this.selectedFiles)
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
