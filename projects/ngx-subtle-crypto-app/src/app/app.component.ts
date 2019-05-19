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
    digestedValue: string;

    constructor(
        private _subtleCrypto: SubtleCryptoService
    ) { }

    ngOnInit(): void {
        this._subtleCrypto
            .digest('SHA-256', this.value)
            .then(data => this.setDigestedValue(data));
    }

    setDigestedValue(digestedValue: string): void {
        this.digestedValue = digestedValue;
    }
}
