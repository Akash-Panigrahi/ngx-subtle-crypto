import { Injectable } from '@angular/core';

import { stringToArrayBuffer, arrayBufferToString, hexString } from '../../utils';
import { DigestReturnForm, DigestAlgorithms, DataToDigest } from '../../types/digest';

@Injectable({
    providedIn: 'root'
})
export class SubtleCryptoService {

    constructor() { }

    digest(algorithm: DigestAlgorithms, dataToDigest: DataToDigest, returnForm?: DigestReturnForm): Promise<string> {
        return Promise.resolve(
            window.crypto.subtle.digest(algorithm || 'SHA-256', stringToArrayBuffer(dataToDigest.toString()))
                .then(digestedData => {
                    let convertedData: string;

                    if (returnForm === 'hexString') {
                        convertedData = hexString(digestedData);
                    } else {
                        convertedData = arrayBufferToString(digestedData);
                    }

                    return convertedData;
                })
        );
    }
}
