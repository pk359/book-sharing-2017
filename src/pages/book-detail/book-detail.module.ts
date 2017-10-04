import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookDetailPage } from './book-detail';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    BookDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BookDetailPage),
    NgbModule
  ],
})
export class BookDetailPageModule {}
