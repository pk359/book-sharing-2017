import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SharebookPage } from '../sharebook/sharebook';
import { FirebaseAuthUser } from '../../app/models/user';
import { AppHelperProvider } from '../../app/providers/app-helper';
import { Book } from '../../app/models/book';
import * as Fuse from 'fuse.js';
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage {

  firebaseAuthUser = new FirebaseAuthUser();

  books: Book[] = []
  filteredBooks: Book[] = []
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public appHelper: AppHelperProvider,
    private alertCtrl: AlertController
  ) {
    this.appHelper.getCurrentFireAuthUser().then((user: FirebaseAuthUser) => {
      this.firebaseAuthUser = user;
    })
    var book: Book = new Book();
    book.author = 'Satya Nadella';
    book.coverURL = 'https://www.sephora.com/productimages/sku/s1828862-main-zoom.jpg',
      book.ownerUid = 'Puf2UfmIRbMj1Jqv3CmJnNkAHNU2';
    book.summary = 'Good book and like it';
    book.title = 'Computer Science'
    this.books.push(book);

    book = new Book();
    //2nd book
    book.author = 'Prem Kumar';
    book.coverURL = 'https://images-na.ssl-images-amazon.com/images/I/518l2awqcnL._SY445_QL70_.jpg',
      book.ownerUid = 'Puf2UfmIRbMj1Jqv3CmJnNkAHNU2';
    book.summary = 'Good book and like it';
    book.title = 'Hit Sc'
    this.books.push(book);

    book = new Book();
    //3rd books
    book.author = 'Qi Sheng Nadella';
    book.coverURL = 'https://c1.staticflickr.com/3/2931/14164804376_834eab573d_b.jpg',
      book.ownerUid = 'Puf2UfmIRbMj1Jqv3CmJnNkAHNU2';
    book.summary = 'Good book and like it';
    book.title = 'Rad'
    this.books.push(book);
    book = new Book();
    //3rd books
    book.author = 'Qi Sheng Nadella';
    book.coverURL = 'https://c1.staticflickr.com/3/2931/14164804376_834eab573d_b.jpg',
      book.ownerUid = 'Puf2UfmIRbMj1Jqv3CmJnNkAHNU2';
    book.summary = 'Good book and like it';
    book.title = 'Rad'
    this.books.push(book);
    book = new Book();
    //3rd books
    book.author = 'Qi Sheng Nadella';
    book.coverURL = 'https://c1.staticflickr.com/3/2931/14164804376_834eab573d_b.jpg',
      book.ownerUid = 'Puf2UfmIRbMj1Jqv3CmJnNkAHNU2';
    book.summary = 'Good book and like it';
    book.title = 'Rad'
    this.books.push(book);
    book = new Book();
    //3rd books
    book.author = 'Qi Sheng Nadella';
    book.coverURL = 'https://c1.staticflickr.com/3/2931/14164804376_834eab573d_b.jpg',
      book.ownerUid = 'Puf2UfmIRbMj1Jqv3CmJnNkAHNU2';
    book.summary = 'Good book and like it';
    book.title = 'Rad'
    this.books.push(book);
    book = new Book();
    //3rd books
    book.author = 'Qi Sheng Nadella';
    book.coverURL = 'https://c1.staticflickr.com/3/2931/14164804376_834eab573d_b.jpg',
      book.ownerUid = 'Puf2UfmIRbMj1Jqv3CmJnNkAHNU2';
    book.summary = 'Good book and like it';
    book.title = 'Rad'
    this.books.push(book);
    book = new Book();
    //3rd books
    book.author = 'Qi Sheng Nadella';
    book.coverURL = 'https://c1.staticflickr.com/3/2931/14164804376_834eab573d_b.jpg',
      book.ownerUid = 'Puf2UfmIRbMj1Jqv3CmJnNkAHNU2';
    book.summary = 'Good book and like it';
    book.title = 'Rad'
    this.books.push(book);
    book = new Book();
    //3rd books
    book.author = 'Qi Sheng Nadella';
    book.coverURL = 'https://c1.staticflickr.com/3/2931/14164804376_834eab573d_b.jpg',
      book.ownerUid = 'Puf2UfmIRbMj1Jqv3CmJnNkAHNU2';
    book.summary = 'Good book and like it';
    book.title = 'Rad'
    this.books.push(book);

    this.filteredBooks = this.books.slice()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LibraryPage');
  }


  goToShareBookPage() {
    this.navCtrl.push(SharebookPage, {})
  }

  showBookDetail(book: Book) {
    this.alertCtrl.create({
      title: 'Want it?',
      message: `${book.title}, ${book.author}`
    }).present()
  }


  getBooks(ev: any) {
    // Reset items back to all of the items
    // this.filteredBooks = this.books.slice()
    // console.log(this.filteredBooks)

    // set val to the value of the searchbar

    let val = ev.target.value;
    if (!val) {
      this.filteredBooks = this.books;
      return;
    }

    // if the value is an empty string don't filter the items
    var book: Book;
    var options = {
      shouldSort: true,
      tokenize: true,
      matchAllTokens: true,
      threshold: 1.0,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: ['title', 'author'],
    };

    var fuse = new Fuse(this.books, options)
    this.filteredBooks = []
    fuse.search(val).forEach((book: Book) => {
      this.filteredBooks.push(book)
    })
    // this.filteredBooks = fuse.search(val);
  }

}
