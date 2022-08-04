import { Co2ForecastContainerComponent } from './co2-forecast-container.sfc'
import { fakeAsync, TestBed, tick } from '@angular/core/testing'
import { Co2ForecastStore } from '@wenlin-site/co2/data-access'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Subscription } from 'rxjs'
import { Co2Forecast } from '@wenlin-site/co2/domain';
import { DateTime } from 'luxon';

describe(Co2ForecastContainerComponent.name, () => {
    beforeEach(() => {
        subscription = new Subscription()
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [Co2ForecastContainerComponent, Co2ForecastStore]
        })

        container = TestBed.inject(Co2ForecastContainerComponent)
        co2ForecastStore = TestBed.inject(Co2ForecastStore)
    })

    afterEach(() => {
        subscription.unsubscribe()
    })

    let container: Co2ForecastContainerComponent
    let co2ForecastStore: Co2ForecastStore
    let subscription: Subscription

    describe('forecast$', () => {
        beforeEach(() => {
            forecastObserver = jest.fn()
            subscription.add(
                container.forecast$.subscribe(forecastObserver)
            )
        })

        let forecastObserver: jest.Mock<void, [Co2Forecast]>

        it('emits the value emitted by the CO2 forecast store', fakeAsync(() => {
            const expectedForecast: Co2Forecast = [
                {
                    CO2Emission: 80,
                    Minutes5UTC: DateTime.fromISO('2022-08-03T21:42:00-04:00'),
                    PriceArea: 'DK1'
                },
                {
                    CO2Emission: 85,
                    Minutes5UTC: DateTime.fromISO('2022-08-03T21:52:00-04:00'),
                    PriceArea: 'DK2'
                }
            ]

            co2ForecastStore.setState({
                forecast: expectedForecast
            })
            tick(0)

            //expect(forecastObserver).toBeCalledTimes(2)
            expect(forecastObserver).toHaveBeenLastCalledWith(expectedForecast)
        }))
    })
})