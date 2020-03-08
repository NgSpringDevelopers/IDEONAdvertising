import { Injectable } from '@angular/core';
import {User} from '../model/user';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
declare var blowfish;
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  secretKey = '1de0nAdvert1s1n9';
  constructor(public fireStore: AngularFirestore) { }

  encrypt(rowValue: string) {
    return blowfish.encrypt(rowValue, this.secretKey, {outputType: +0, cipherMode: +0});
  }

  decrypt(encryptedVal: string) {
    return blowfish.decrypt(encryptedVal, this.secretKey, {outputType: +0, cipherMode: +0});
  }

  loginUser(user: User) {
    this.fireStore.collection('user', ref => ref.where('username', '==', user.username)
      .where('password', '==', this.encrypt(user.password))
    ).valueChanges().subscribe(res => {
      if (res.length > 0) {
        console.log('hellow');
        // localStorage.setItem('token');
      }
    });
  }
}
