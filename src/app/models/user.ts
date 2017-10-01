import * as firebase from 'firebase/app';
export class DatabaseUser {
    uid: string;
    displayName: string
    photoURL: string
    email: string
    phoneNumber: string

    update(): Promise<any> {
        return new Promise((resolve, reject) => {
          firebase.database().ref(`users/${this.uid}`).set(this).then(_ => {
           console.log('updated '+ this.uid)
           resolve()
          }).catch(err => {
            reject(err)
          })
        })
    }
}

/**
 * Is is a mocked structure of firebase.User
 * We will not import firebase at all places and only in providers
 */

export class FirebaseAuthUser{
    uid: string
    displayName: string
    photoURL: string
    email: string
}