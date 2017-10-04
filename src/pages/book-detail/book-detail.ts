import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Book } from '../../app/models/book';

@IonicPage({
  segment: 'book-detail/:title'
})
@Component({
  selector: 'page-book-detail',
  templateUrl: 'book-detail.html',
})
export class BookDetailPage {

  book: Book
  constructor(public navCtrl: NavController, public navParams: NavParams,
  ) {

    this.book = navParams.get('book');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookDetailPage');
  }

}
