import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, NgModule, ViewEncapsulation } from "@angular/core";
import { Co2ForecastStore } from "@wenlin-site/co2/data-access";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'wl-co2-forecast-ui',
    styles: [
        `
        :host { 
            display: block; 
        }
        `
    ],
    template: `<h1>CO2 forecast</h1>`,
    viewProviders: [Co2ForecastStore]
})

export class Co2ForecastComponent {}

@NgModule({
    declarations: [Co2ForecastComponent],
    exports: [Co2ForecastComponent],
})
export class Co2ForecastScam {}