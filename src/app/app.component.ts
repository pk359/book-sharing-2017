import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppHelperProvider } from './providers/app-helper';
import { User } from './models/user';
import { LibraryPage } from '../pages/library/library';
import { ProfilePage } from '../pages/profile/profile';
import { SharebookPage } from '../pages/sharebook/sharebook';

@Component({
  selector: 'app-component',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LibraryPage;
  pages: Array<{ title: string, component: any }>;
  user: User
  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public apphelper: AppHelperProvider
  ) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Library', component: LibraryPage },
      { title: 'Profile', component: ProfilePage },
    ];

  }

  initializeApp() {
    /*
    Check if user is logged in.
    */
    this.apphelper.getCurrentUser().then(user => {
      this.user = user;
    })
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  loginWithGooglePopup() {
    this.apphelper.loginWithGooglePopup().then((user: User) => {
      this.user = user;
      console.log(this.user)
      // Object.assign(this.user, user)
    }).catch(err => {
      console.log(err)
    })
  }
  logout() {
    this.user = null;
    this.apphelper.logout();
  }
}
