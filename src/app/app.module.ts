//Library imports
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicPageModule } from 'ionic-angular';

import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';

//Page Imports
import { MyApp } from './app.component';

//Providers
import { AppHelperProvider } from './providers/app-helper';
import { LibraryPageModule } from '../pages/library/library.module';
import { SharebookPageModule } from '../pages/sharebook/sharebook.module';
import { ProfilePageModule } from '../pages/profile/profile.module';



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
    // LibraryPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      preloadModules: true
    }),
    LibraryPageModule, 
    SharebookPageModule,
    ProfilePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // LibraryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppHelperProvider,
  ]
})
export class AppModule { }
