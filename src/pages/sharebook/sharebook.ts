import { AppHelperProvider } from './../../app/providers/app-helper';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Book } from '../../app/models/book';
import firebase from 'firebase'
import { DatabaseUser, FirebaseAuthUser } from '../../app/models/user';
@IonicPage()
@Component({
  selector: 'page-sharebook',
  templateUrl: 'sharebook.html',
})
export class SharebookPage {
  selectedFile: File
  book: Book = new Book();
  errors: string[] = [];
  fireAuthUser: FirebaseAuthUser = new FirebaseAuthUser();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public appHelper: AppHelperProvider
  ) {
    appHelper.getCurrentFireAuthUser().then((user: FirebaseAuthUser) => {
      this.fireAuthUser = user;
    })
  }

  submitBook() {
    console.log(this.book, this.selectedFile)
    this.errors = this.validateBook(this.book);
    // this.errors = this.validateBook(this.book);
    //If there is error;
    if (this.errors.length === 0) {
      //File is valid, book is valid
      this.book.author = ''
      this.book.summary = ''
      this.book.title = ''
      this.book.isbn = ''
      this.selectedFile = null;
      this.saveBookToFirebase(this.book);
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

    if (this.selectedFile && !this.validImageFile(this.selectedFile)) {
      // errors.push('ISBN seems invalid');
    }
    console.log(errors, 'string');
    return errors;
  }

  onFileChange(event){
    this.selectedFile = event.target.files[0];
  }

  validImageFile(file){
    console.log(file)
  }

  saveBookToFirebase(book:Book) {
    //First save image to firebase storage - allow only one image

    //Then push book to database.

    /*
      Create url of image array, posting time, ownerUid, likes
      Update upload list for user.
    */
    var bookRef = firebase.database().ref('books').push();

    /*
    Now we have the key, let us save the image into fire storage. Get URL and update our
    book
    */
    firebase.storage().ref('coverphotos/'+ bookRef.key + '.jpg');
    /*
    complete function to upload blob 
    */
    // book.coverURL = url;
    // book.ownerUID = this.fireAuthUser.uid
    // book.postingTime = moment()
    // book.likes = 0


    bookRef.set(this.book).then(r => {
      this.book = new Book();
    })
    
    firebase.database().ref('users/'+ this.fireAuthUser.uid + '/uploadList/'+bookRef.key).set(true);
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
