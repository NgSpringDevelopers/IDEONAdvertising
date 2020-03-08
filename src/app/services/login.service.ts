import { Injectable } from '@angular/core';
declare var blowfish;
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  secretKey = '1de0nAdvert1s1n9';
  constructor() { }

  encrypt(rowValue: string) {
    return blowfish.encrypt(rowValue, this.secretKey, {outputType: +0, cipherMode: +0});
  }

  decrypt(encryptedVal: string) {
    return blowfish.decrypt(encryptedVal, this.secretKey, {outputType: +0, cipherMode: +0});
  }
}
