import * as firebase from 'firebase/app';
import { BrowserModule } from '@angular/platform-browser';
export class Book {
    key: string;
    title: string;
    author: string;
    isbn?: string;
    coverURLs: string[];
    summary: string;
    ownerUid: string


    public  save(files: File[]): Promise<boolean> {
        const ref = firebase.database().ref('books').push();
        return new Promise<boolean>((resolve, reject) => {

            this.key = ref.key;
            const promiseList: Promise<string>[] = [];
            files.forEach(file => {
                const promise = new Promise<string>((resolve, reject) => {
                    firebase.storage().ref(this.key).put(file).then(snap => {
                        resolve(snap.downloadURL);
                    }).catch(err => {
                        reject(err['message']);
                    })
                })
                promiseList.push(promise);
            })

            Promise.all(promiseList).then( (list: string[]) => {
                this.coverURLs = list;
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

