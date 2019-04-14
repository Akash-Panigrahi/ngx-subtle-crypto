import { Component } from '@angular/core';
import { SubtleCryptoService } from 'ngx-subtle-crypto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-subtle-crypto-app';

  value = 'akash';
  digestedValue: string;
  digestedValue1: string;

  constructor(
    private _subtleCrypto: SubtleCryptoService
  ) { }

  ngOnInit(): void {
    this._subtleCrypto.digest('SHA-256', this.value)
      .subscribe(data => this.digestedValue = data);
    this._subtleCrypto.digest('SHA-256', this.value)
      .subscribe(data => this.digestedValue1 = data);
  }
}
