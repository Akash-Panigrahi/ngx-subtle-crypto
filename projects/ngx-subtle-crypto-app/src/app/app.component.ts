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
    hash;
    symSigned;
    asymSigned;
    symEncrypted;
    symDecrypted;
    asymEncrypted;
    asymDecrypted;

    constructor(
        private _subtleCrypto: SubtleCryptoService
    ) { }

    ngOnInit() {
        this.createHash();
        this.symSign();
        this.asymSign();
        this.symEncrypt();
        this.asymEncrypt();
    }

    async createHash(): Promise<void> {
        this.hash = await this._subtleCrypto.digest('SHA-256', this.value);
    }

    async symSign(): Promise<void> {
        const algorithm = { name: "HMAC", hash: { name: "SHA-512" } };

        const key = await this._subtleCrypto.generateKey(algorithm, true, ["sign", "verify"]);
        const signature = await this._subtleCrypto.sign(algorithm, key, this.value);
        const verifyResult = await this._subtleCrypto.verify(algorithm, key, signature, this.value);

        this.symSigned = signature;
        console.log('symSign', verifyResult);
    }

    async asymSign(): Promise<void> {
        const algorithm = { name: "RSA-PSS", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" };

        const { privateKey, publicKey } = await this._subtleCrypto.generateKeyPair(algorithm, true, ["sign", "verify"]);
        const signature = await this._subtleCrypto.sign({ name: "RSA-PSS", saltLength: 32, }, privateKey, this.value);
        const verifyResult = await this._subtleCrypto.verify({ name: "RSA-PSS", saltLength: 32, }, publicKey, signature, this.value);

        this.asymSigned = signature;
        console.log('asymSign', verifyResult);
    }

    async symEncrypt(): Promise<void> {
        const algorithm = { name: "AES-CTR", length: 256 };
        const counter = window.crypto.getRandomValues(new Uint8Array(16));

        const key = await this._subtleCrypto.generateKey(algorithm, true, ["encrypt", "decrypt"]);
        const cipherText = await this._subtleCrypto.encrypt({
            name: "AES-CTR",
            counter,
            length: 64
          }, key, this.value);

        const plainText = await this._subtleCrypto.decrypt({
            name: "AES-CTR",
            counter,
            length: 64
          }, key, cipherText);

        this.symEncrypted = cipherText;
        console.log('symEncrypt', plainText);
    }

    async asymEncrypt(): Promise<void> {
        const algorithm = { name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" };

        const { privateKey, publicKey } = await this._subtleCrypto.generateKeyPair(algorithm, true, ["encrypt", "decrypt"]);
        const cipherText = await this._subtleCrypto.encrypt({ name: "RSA-OAEP" }, publicKey, this.value);

        const plainText = await this._subtleCrypto.decrypt({ name: "RSA-OAEP" }, privateKey, cipherText);

        this.asymEncrypted = cipherText;
        console.log('asymEncrypt', plainText);
    }
}
