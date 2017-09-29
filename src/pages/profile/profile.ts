
import { AppHelperProvider } from './../../app/providers/app-helper';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  edittable = false
  edittedData: any = {}
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apphelper: AppHelperProvider,
    public alertCtrl: AlertController
  ) {
  }

  getUser() {
    return this.apphelper.dbUser;
  }

  onSave() {
    console.log('editted data', this.edittedData);
    if (Object.keys(this.edittedData).length > 0) {
      this.apphelper.updateProfile(this.edittedData).then(_=>{
        this.toggleEdittable();
      })
    }
  }
  toggleEdittable() {
    this.edittable = !this.edittable;
  }

}
