import { NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { SharebookPage } from '../sharebook/sharebook';
import { FirebaseAuthUser } from '../../app/models/user';
import { AppHelperProvider } from '../../app/providers/app-helper';
import { Book } from '../../app/models/book';
import * as Fuse from 'fuse.js';

import { Component, OnInit } from '@angular/core';
@IonicPage()
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage implements OnInit{

  firebaseAuthUser = new FirebaseAuthUser();

  books: Book[] = []
  filteredBooks: Book[] = []
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public appHelper: AppHelperProvider,
    private alertCtrl: AlertController,
  ) {
    
  }
  ngOnInit(){
    this.appHelper.getBooks().then(books=>{
      this.books = books;
      this.filteredBooks = books;
    })
  }

  getUser(){
    return this.appHelper.dbUser;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LibraryPage');
  }


  goToShareBookPage() {
    this.navCtrl.push(SharebookPage, {})
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


  showBookDetail(book: Book) {
    `
    <h4><b>${book.title}</b>, (Author: <i>${book.author}</i>)</h4>
   <img src='${book.coverURLs[0]}'>
   
    <ion-textarea rows="4" [(ngModel)]="message"></ion-textarea>
    <button ion-button round block (click)="">Send message</button>
   `

    // dialogRef.result
    //    .then( result => alert(`The result is: ${result}`) );


  }

}
