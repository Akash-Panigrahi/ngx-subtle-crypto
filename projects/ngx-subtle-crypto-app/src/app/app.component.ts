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

    constructor(
        private _subtleCrypto: SubtleCryptoService
    ) { }

    ngOnInit(): void {
        this.createHash();
        this.symSign();
        this.asymSign();
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
}
