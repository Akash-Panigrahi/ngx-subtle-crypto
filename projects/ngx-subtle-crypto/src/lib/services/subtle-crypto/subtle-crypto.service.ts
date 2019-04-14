import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

import { stringToArrayBuffer, arrayBufferToString } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class SubtleCryptoService {

  constructor() { }

  digest(algorithm: string = 'SHA-256', data: string): Observable<string> {
    const digestValue = window.crypto.subtle.digest(algorithm, stringToArrayBuffer(data));
    console.log(digestValue);
    return from(digestValue.then(arrayBufferToString));
  }
}
