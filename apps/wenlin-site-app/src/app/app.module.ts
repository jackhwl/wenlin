import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent, AppScam } from './app.sfc';

@NgModule({
  bootstrap: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppScam],
})
export class AppModule {}
