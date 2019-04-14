import { Injectable } from '@angular/core';
import { of, Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubtleCryptoService {

  constructor() { }

  private _stringToArrayBuffer(str: string): ArrayBuffer {
    const buffer = new ArrayBuffer(str.length * 2); // 2 bytes for each array
    const bufferView = new Uint16Array(buffer);

    for (let i = 0; i < str.length; i++) {
      bufferView[i] = str.charCodeAt(i);
    }

    return buffer;
  }

  digest(algorithm: string = 'SHA-256', data: string): Observable<string> {
    const digestValue = window.crypto.subtle.digest(algorithm, this._stringToArrayBuffer(data));
    console.log(digestValue);
    return from(digestValue.then(this._arrayBufferToString));
  }

  private _arrayBufferToString(ab: ArrayBuffer): string {
    return String.fromCharCode.apply(null, new Uint16Array(ab));
  }
}
