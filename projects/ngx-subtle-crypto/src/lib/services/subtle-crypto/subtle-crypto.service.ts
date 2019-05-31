import { Injectable } from '@angular/core';

import { convertData, properData } from '../../utils';
import { DigestAlgorithm, DataToDigest } from '../../types/digest';
import { VerifyAlgorithm, VerifyKey, VerifySignature, DataToVerify } from '../../types/verify';
import { DataToSign, SignAlgorithm, SignKey } from '../../types/sign';
import { GenrateKeyAlgorithm, GenrateKeyExtractable, GenrateKeyKeyUsages } from '../../types/generate-key';
import { GenrateKeyPairAlgorithm, GenrateKeyPairExtractable, GenrateKeyPairKeyUsages } from '../../types/generate-key-pair';

@Injectable({
    providedIn: 'root'
})
export class SubtleCryptoService {

    private _subtle = window.crypto.subtle;

    constructor() { }

    digest(
        algorithm    : DigestAlgorithm,
        dataToDigest : DataToDigest,
        bytes?       : number): Promise<string> {

        return Promise.resolve(
            this._subtle
                .digest(algorithm, properData(dataToDigest, bytes))
                .then(digestedData => convertData(digestedData, bytes))
        );
    }

    sign(
        algorithm   : SignAlgorithm,
        key         : SignKey,
        dataToSign  : DataToSign,
        bytes?      : number): Promise<string> {

        return Promise.resolve(
            this._subtle
                .sign(algorithm, key, properData(dataToSign, bytes))
                .then(signedData => convertData(signedData, bytes))
        );
    }

    verify(
        algorithm    : VerifyAlgorithm,
        key          : VerifyKey,
        signature    : VerifySignature,
        dataToVerify : DataToVerify,
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
        extractable : GenrateKeyPairExtractable,
        keyUsages   : GenrateKeyPairKeyUsages): Promise<CryptoKeyPair> {

        return Promise.resolve(
            this._subtle
                .generateKey(algorithm, extractable, keyUsages)
                .then((keyPair: CryptoKeyPair) => keyPair)
        );
    }

    generateKey(
        algorithm   : GenrateKeyAlgorithm,
        extractable : GenrateKeyExtractable,
        keyUsages   : GenrateKeyKeyUsages): Promise<CryptoKey> {

        return Promise.resolve(
            this._subtle
                .generateKey(algorithm, extractable, keyUsages)
                .then((key: CryptoKey) => key)
        );
    }
}
