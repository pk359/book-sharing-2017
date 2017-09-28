import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharebookPage } from './sharebook';

@NgModule({
  declarations: [
    SharebookPage,
  ],
  imports: [
    IonicPageModule.forChild(SharebookPage),
  ],
  entryComponents: [
    SharebookPage
  ]
})
export class SharebookPageModule {}
