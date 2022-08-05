import { Co2FeatureForecastModule } from './co2-feature-forecast.module';
import { Co2ForecastContainerComponent } from './co2-forecast-container.sfc';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'wl-test-host',
  template: `<wl-co2-forecast></wl-co2-forecast>`,
})
export class TestHostComponent {}

describe(Co2FeatureForecastModule.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [Co2FeatureForecastModule, HttpClientTestingModule],
    });

    hostFixture = TestBed.createComponent(TestHostComponent);
  });

  let hostFixture: ComponentFixture<TestHostComponent>;

  it(`exports the ${Co2ForecastContainerComponent.name}`, () => {
    const co2ForecastContainer = hostFixture.debugElement.query(
      By.directive(Co2ForecastContainerComponent)
    );

    expect(co2ForecastContainer.componentInstance).toBeInstanceOf(
      Co2ForecastContainerComponent
    );
  });
});
