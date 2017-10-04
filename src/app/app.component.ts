import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppHelperProvider } from './providers/app-helper';
import { LibraryPage } from '../pages/library/library';
import { SharebookPage } from '../pages/sharebook/sharebook';
import { ProfilePage } from '../pages/profile/profile';
import { FirebaseAuthUser, DatabaseUser } from './models/user';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
}
@Component({
  selector: 'app-component',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LibraryPage';
  pages: Array<{ title: string, iconName: string, component: any }>;
  menuItemSelected: string = ''
  user: any;
  loggedInPages: PageInterface[] = [
    { title: 'Messages', name: 'MessagesPage', icon: 'text', component: 'MessagesPage' },
    { title: 'Library', name: 'LibraryPage', icon: 'albums', component: 'LibraryPage' },
    { title: 'Sharebook', name:'SharebookPage', icon: 'share-alt', component: 'SharebookPage' },
    { title: 'Profile', name: 'ProfilePage', icon: 'person', component: 'ProfilePage' }
  ]
  loggedOutPages: PageInterface[] = [
    { title: 'Library', name: 'LibraryPage', icon: 'albums', component: 'LibraryPage' }
  ]
  
  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public appHelper: AppHelperProvider,
    public events: Events,
    public menu: MenuController
  ) {
    this.initializeApp();
    // used for an example of ngFor and navigation

    this.menuItemSelected = 'Library';

    this.events.subscribe('user:loggedIn', (res) => {
      this.user = res;
      this.enableMenu(true)
    })
    this.events.subscribe('user:loggedOut', (res) => {
      this.user = null;
      this.enableMenu(false)
    })
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  initializeApp() {
    /*
    Check if user is logged in.
    */

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.menuItemSelected = page.title;
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  async loginWithGooglePopup() {
    this.appHelper.loginWithGooglePopup();
  }
  logout() {
    this.appHelper.logout();
    this.nav.setRoot('LibraryPage');
  }
}
