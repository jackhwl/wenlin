import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Co2FeatureForecastModule } from '@wenlin-site/co2/feature-forecast';

@Component({
  selector: 'wl-root',
  template: `
    <header class="flex">
      <img alt="Nx logo" width="75" src="/assets/images/nx-logo-white.svg" />
      <h1>Welcome to {{ title }}!</h1>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: sans-serif;
        min-width: 300px;
        max-width: 600px;
        margin: 50px auto;
      }

      .flex {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      header {
        background-color: #143055;
        color: white;
        padding: 5px;
        border-radius: 3px;
      }

      main {
        padding: 0 36px;
      }

      p {
        text-align: center;
      }

      h1 {
        text-align: center;
        margin-left: 18px;
        font-size: 24px;
      }

      h2 {
        text-align: center;
        font-size: 20px;
        margin: 40px 0 10px 0;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Energy Insights';
}

@NgModule({
  declarations: [AppComponent],
  imports: [Co2FeatureForecastModule, RouterModule],
})
export class AppScam {}
