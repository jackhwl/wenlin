import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent, AppScam } from './app.sfc';

@NgModule({
  bootstrap: [AppComponent],
  imports: [BrowserModule, AppScam],
})
export class AppModule {}
