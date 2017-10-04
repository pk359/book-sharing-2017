import * as firebase from 'firebase/app';
import { BrowserModule } from '@angular/platform-browser';
import { DatabaseUser } from './user';
export class Book {
    key: string;
    title: string;
    author: string;
    isbn?: string;
    coverURLs: string[];
    summary: string;
    uploadedBy: string


    public  save(files: File[], user: firebase.UserInfo): Promise<boolean> {
        const ref = firebase.database().ref('books').push();
        return new Promise<boolean>((resolve, reject) => {
            this.key = ref.key;
            const promiseList: Promise<string>[] = [];
            files.forEach((file, i) => {
                const promise = new Promise<string>((resolve, reject) => {
                    firebase.storage().ref(this.key + '/' + i).put(file).then(snap => {
                        resolve(snap.downloadURL);
                    }).catch(err => {
                        reject(err['message']);
                    })
                })
                promiseList.push(promise);
            })

            Promise.all(promiseList).then( (listOfUrls: string[]) => {
                this.coverURLs = listOfUrls;
                this.uploadedBy = user.uid;
                // if(user.uploadList){
                //     user.uploadList.push(this.key);
                // }else{
                //     user.uploadList = [this.key]
                // }
                // // user.update();//updating in firebase
                // firebase.database().ref('users/'+ user.key).set(user);
                //creating new book
                ref.set(this).catch(err=>{
                    reject(err)
                })
                //* Everything works so resolve */
                resolve(true)
            }).catch(err => {
                console.log(err)
                reject(false);
            })

        })

    }


}

