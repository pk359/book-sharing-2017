import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import { AppHelperProvider } from './providers/app-helper';
import { LibraryPage } from '../pages/library/library';
import { ProfilePage } from '../pages/profile/profile';
import { SharebookPage } from '../pages/sharebook/sharebook';

var config = {
  apiKey: "AIzaSyDZt04r-XQ-RkhAek95CQuXrAuitb3x22o",
  authDomain: "ubookfirebase.firebaseapp.com",
  databaseURL: "https://ubookfirebase.firebaseio.com",
  projectId: "ubookfirebase",
  storageBucket: "ubookfirebase.appspot.com",
  messagingSenderId: "121474735307"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    LibraryPage,
    ProfilePage,
    SharebookPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LibraryPage,
    ProfilePage,
    SharebookPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppHelperProvider
  ]
})
export class AppModule { }
