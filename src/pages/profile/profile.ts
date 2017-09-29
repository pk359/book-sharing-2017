import { FirebaseAuthUser, DatabaseUser } from './../../app/models/user';
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

  fireAuthUser: FirebaseAuthUser
  dbUser: DatabaseUser = new DatabaseUser()
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apphelper: AppHelperProvider,
    public alertCtrl: AlertController
  ) {
    


  }

  getUser(){
    return this.apphelper.dbUser;
  }

  updatePhone() {
    let confirm = this.alertCtrl.create({
      title: "Update Phone No.",
      inputs: [
        {
          name: "phoneNumber",
          placeholder: "Enter Phone No."
        }
      ],
      buttons: [
        {
          text: "Confirm",
          handler: data => {
            if (data) {
              this.apphelper.updatePhone(data)
            }
          }
        },
        {
          text: "Cancel",
          handler: () => {

          }
        }
      ]
    })
    confirm.present()
  }
}
