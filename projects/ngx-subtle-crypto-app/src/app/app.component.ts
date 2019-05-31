import { Component, OnInit } from '@angular/core';
import { SubtleCryptoService } from 'ngx-subtle-crypto';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'ngx-subtle-crypto-app';

    value = 'akash';
    digestedValue: any;
    signedValue: any;
    verifiedValue: any;
    hexSignedValue;
    hexVerifiedValue;
    keyPair: any;
    key: CryptoKey;

    constructor(
        private _subtleCrypto: SubtleCryptoService
    ) { }

    ngOnInit(): void {
        this.digest();
        this.generateKeyPair();
        this.generateKey();
    }

    digest(): void {
        this._subtleCrypto
            .digest('SHA-256', this.value/* , 'hexString' */)
            .then(data => this.setDigestedValue(data));
    }

    setDigestedValue(digestedValue: string): void {
        this.digestedValue = digestedValue;
    }

    generateKeyPair(): void {
        this._subtleCrypto
            .generateKeyPair(
                {
                    name: "RSA-OAEP",
                    modulusLength: 2048,
                    publicExponent: new Uint8Array([1, 0, 1]),
                    hash: "SHA-256",
                },
                true,
                ["encrypt", "decrypt"]
            )
            .then(keyPair => this.setKeyPairs(keyPair));
    }

    generateKey(): void {
        this._subtleCrypto
            .generateKey(
                {
                    name: "HMAC",
                    hash: { name: "SHA-512" }
                },
                true,
                ["sign", "verify"]
            )
            .then(key => this.setKey(key));
    }

    setKeyPairs(keyPair: CryptoKeyPair): void {
        this.keyPair = keyPair;
    }

    setKey(key: CryptoKey): void {
        this.key = key;

        this.sign();
    }

    sign() {
        this._subtleCrypto.sign(
                'HMAC',
                this.key,
                this.value,
                // 'hexString'
            )
            .then(signedValue => this.setSignedValue(signedValue));

        this._subtleCrypto.sign(
                'HMAC',
                this.key,
                this.value,
                'hexString'
            )
            .then(hexSignedValue => this.setHexSignedValue(hexSignedValue));
    }

    setSignedValue(signedValue): void {
        this.signedValue = signedValue;

        this.verify();
    }

    setHexSignedValue(hexSignedValue): void {
        this.hexSignedValue = hexSignedValue;

        this.verifyHex();
    }

    verify() {
        this._subtleCrypto.verify(
                'HMAC',
                this.key,
                this.signedValue,
                this.value,
                // 'hexString'
            )
            .then(verifiedValue => this.setVerifiedValue(verifiedValue));
    }

    verifyHex() {
        this._subtleCrypto.verify(
                'HMAC',
                this.key,
                this.hexSignedValue,
                this.value,
                'hexString'
            )
            .then(hexVerifiedValue => this.setHexVerifiedValue(hexVerifiedValue));
    }

    setVerifiedValue(verifiedValue): void {
        this.verifiedValue = verifiedValue;
    }

    setHexVerifiedValue(hexVerifiedValue): void {
        this.hexVerifiedValue = hexVerifiedValue;
    }
}
