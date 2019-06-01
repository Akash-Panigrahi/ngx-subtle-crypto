import { Injectable } from '@angular/core';

import { convertData, properData } from '../../utils';
import { DigestAlgorithm } from '../../types/digest';
import { VerifyAlgorithm } from '../../types/verify';
import { SignAlgorithm } from '../../types/sign';
import { GenrateKeyAlgorithm } from '../../types/generate-key';
import { GenrateKeyPairAlgorithm } from '../../types/generate-key-pair';
import { Key, Extractable, KeyUsages } from '../../types/common';

@Injectable({
    providedIn: 'root'
})
export class SubtleCryptoService {

    private _subtle = window.crypto.subtle;

    constructor() { }

    digest(
        algorithm    : DigestAlgorithm,
        dataToDigest : string,
        bytes?       : number): Promise<string> {

        return Promise.resolve(
            this._subtle
                .digest(algorithm, properData(dataToDigest, bytes))
                .then(digestedData => convertData(digestedData, bytes))
        );
    }

    sign(
        algorithm   : SignAlgorithm,
        key         : Key,
        dataToSign  : string,
        bytes?      : number): Promise<string> {

        return Promise.resolve(
            this._subtle
                .sign(algorithm, key, properData(dataToSign, bytes))
                .then(signedData => convertData(signedData, bytes))
        );
    }

    verify(
        algorithm    : VerifyAlgorithm,
        key          : Key,
        signature    : string,
        dataToVerify : string,
        bytes?       : number): Promise<boolean> {

        return Promise.resolve(
            this._subtle
                .verify(
                    algorithm,
                    key,
                    properData(signature, bytes),
                    properData(dataToVerify, bytes)
                )
                .then(verifiedData => verifiedData)
        );
    }

    generateKeyPair(
        algorithm   : GenrateKeyPairAlgorithm,
        extractable : Extractable,
        keyUsages   : KeyUsages): Promise<CryptoKeyPair> {

        return Promise.resolve(
            this._subtle
                .generateKey(algorithm, extractable, keyUsages)
                .then((keyPair: CryptoKeyPair) => keyPair)
        );
    }

    generateKey(
        algorithm   : GenrateKeyAlgorithm,
        extractable : Extractable,
        keyUsages   : KeyUsages): Promise<CryptoKey> {

        return Promise.resolve(
            this._subtle
                .generateKey(algorithm, extractable, keyUsages)
                .then((key: CryptoKey) => key)
        );
    }
}
