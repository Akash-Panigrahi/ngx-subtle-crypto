import { Injectable } from '@angular/core';

import { convertData, properData } from '../../utils';
import { DigestAlgorithm } from '../../types/digest';
import { VerifyAlgorithm } from '../../types/verify';
import { SignAlgorithm } from '../../types/sign';
import { GenrateKeyAlgorithm } from '../../types/generate-key';
import { GenrateKeyPairAlgorithm } from '../../types/generate-key-pair';
import { SubtleKey, SubtleExtractable, SubtleKeyUsages, SubtleKeyPair, SubtleData, PlainText, CipherText } from '../../types/common';
import { DecryptAlgorithm, EncryptAlgorithm } from '../../types';

@Injectable({
    providedIn: 'root'
})
export class SubtleCryptoService {

    private _subtle = window.crypto.subtle;

    constructor() { }

    digest(
        algorithm    : DigestAlgorithm,
        dataToDigest : SubtleData,
        bytes?       : number): Promise<SubtleData> {

        return Promise.resolve(
            this._subtle
                .digest(algorithm, properData(dataToDigest, bytes))
                .then(digestedData => convertData(digestedData, bytes))
        );
    }

    sign(
        algorithm   : SignAlgorithm,
        key         : SubtleKey,
        dataToSign  : SubtleData,
        bytes?      : number): Promise<SubtleData> {

        return Promise.resolve(
            this._subtle
                .sign(algorithm, key, properData(dataToSign, bytes))
                .then(signedData => convertData(signedData, bytes))
        );
    }

    verify(
        algorithm    : VerifyAlgorithm,
        key          : SubtleKey,
        signature    : SubtleData,
        dataToVerify : SubtleData,
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

    encrypt(
        algorithm    : EncryptAlgorithm,
        key          : SubtleKey,
        plainText    : PlainText,
        bytes?       : number): Promise<CipherText> {

        return Promise.resolve(
            this._subtle
                .encrypt(
                    algorithm,
                    key,
                    properData(plainText, bytes)
                )
                .then(encrypted => convertData(encrypted, bytes))
        );
    }

    decrypt(
        algorithm    : DecryptAlgorithm,
        key          : SubtleKey,
        cipherText   : CipherText,
        bytes?       : number): Promise<PlainText> {

        return Promise.resolve(
            this._subtle
                .decrypt(
                    algorithm,
                    key,
                    properData(cipherText, bytes)
                )
                .then(decrypted => convertData(decrypted, bytes))
        );
    }

    generateKeyPair(
        algorithm   : GenrateKeyPairAlgorithm,
        extractable : SubtleExtractable,
        keyUsages   : SubtleKeyUsages): Promise<SubtleKeyPair> {

        return Promise.resolve(
            this._subtle
                .generateKey(algorithm, extractable, keyUsages)
                .then((keyPair: SubtleKeyPair) => keyPair)
        );
    }

    generateKey(
        algorithm   : GenrateKeyAlgorithm,
        extractable : SubtleExtractable,
        keyUsages   : SubtleKeyUsages): Promise<SubtleKey> {

        return Promise.resolve(
            this._subtle
                .generateKey(algorithm, extractable, keyUsages)
                .then((key: SubtleKey) => key)
        );
    }
}
