import { Injectable } from '@angular/core';

import { convertData, properData } from '../../utils';

import { DigestStringForm, DigestAlgorithm, DataToDigest } from '../../types/digest';
import { GenrateKeyAlgorithm, GenrateKeyExtractable, GenrateKeyKeyUsages } from '../../types/generate-key';
import { GenrateKeyPairAlgorithm, GenrateKeyPairExtractable, GenrateKeyPairKeyUsages } from '../../types/generate-key-pair';
import { DataToSign, SignAlgorithm, SignKey, SignStringForm } from '../../types/sign';
import { VerifyAlgorithm, VerifyKey, VerifySignature, DataToVerify, VerifyStringForm } from '../../types/verify';

@Injectable({
    providedIn: 'root'
})
export class SubtleCryptoService {

    private _subtle = window.crypto.subtle;

    constructor() { }

    digest(
        algorithm    : DigestAlgorithm,
        dataToDigest : DataToDigest,
        stringForm?  : DigestStringForm,
        bytes?       : number): Promise<string> {

        return Promise.resolve(
            this._subtle
                .digest(algorithm, properData(dataToDigest, stringForm, bytes))
                .then(digestedData => convertData(digestedData, stringForm, bytes))
        );
    }

    sign(
        algorithm   : SignAlgorithm,
        key         : SignKey,
        dataToSign  : DataToSign,
        stringForm? : SignStringForm,
        bytes?      : number): Promise<string> {

        return Promise.resolve(
            this._subtle
                .sign(algorithm, key, properData(dataToSign, stringForm, bytes))
                .then(signedData => convertData(signedData, stringForm, bytes))
        );
    }

    verify(
        algorithm    : VerifyAlgorithm,
        key          : VerifyKey,
        signature    : VerifySignature,
        dataToVerify : DataToVerify,
        stringForm?  : VerifyStringForm,
        bytes?       : number): Promise<boolean> {

        return Promise.resolve(
            this._subtle
                .verify(
                    algorithm,
                    key,
                    properData(signature, stringForm, bytes),
                    properData(dataToVerify, stringForm, bytes)
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
