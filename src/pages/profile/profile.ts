
import { AppHelperProvider } from './../../app/providers/app-helper';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController, Events } from 'ionic-angular';
import { DatabaseUser } from '../../app/models/user';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  edittable = false
  edittedData: any = {}
  dbUser: DatabaseUser = new DatabaseUser()
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appHelper: AppHelperProvider,
    public alertCtrl: AlertController,
    public events: Events,
    public storage: Storage
  ) {
   
  }
  ionViewDidLoad(){
    this.appHelper.getDBUser().then(res=>{
      this.dbUser = res;
    })
  }

  ionViewCanEnter():Promise<boolean>{
    return new Promise<boolean>((resolve, reject)=>{
      this.storage.get('currentUser').then(res=>{
        var currentUser = JSON.parse(res);
        if(currentUser){
         resolve(true)
        }else{
          resolve(false)
          this.appHelper.alertUserToLogin()
        }
      })
    }) 
  }

  getUser() {
    return this.appHelper.user;
  }

  onSave() {
    console.log('editted data', this.edittedData);
    if (Object.keys(this.edittedData).length > 0) {
      this.appHelper.updateProfile(this.edittedData).then(_=>{
        this.toggleEdittable();
      })
    }
  }
  toggleEdittable() {
    this.edittable = !this.edittable;
  }

}
