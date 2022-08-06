import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { co2RoutePath } from '@wenlin-site/co2/feature-forecast';
import { AppComponent, AppScam } from './app.sfc';

const routes: Routes = [
  {
    path: co2RoutePath,
    loadChildren: () =>
      import('@wenlin-site/co2/feature-forecast').then(
        (esModule) => esModule.Co2FeatureForecastModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: co2RoutePath,
  },
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppScam,
  ],
})
export class AppModule {}
