import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';
import { Co2ForecastStore } from '@wenlin-site/co2/data-access';
import { Co2Forecast } from '@wenlin-site/co2/domain';
import { Observable } from 'rxjs';
import { Co2ForecastScam } from './co2-forecast.sfc';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'wl-co2-forecast',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  template: `<wl-co2-forecast-ui
    [forecast]="forecast$ | async"
  ></wl-co2-forecast-ui> `,
  viewProviders: [Co2ForecastStore],
})
export class Co2ForecastContainerComponent {
  forecast$: Observable<Co2Forecast>;

  constructor(co2ForecastStore: Co2ForecastStore) {
    this.forecast$ = co2ForecastStore.forecast$;
  }
}

@NgModule({
  declarations: [Co2ForecastContainerComponent],
  imports: [CommonModule, Co2ForecastScam],
})
export class Co2ForecastContainerScam {}
