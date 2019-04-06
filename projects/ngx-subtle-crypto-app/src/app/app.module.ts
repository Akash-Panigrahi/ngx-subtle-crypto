import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxSubtleCryptoModule } from 'ngx-subtle-crypto';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSubtleCryptoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
