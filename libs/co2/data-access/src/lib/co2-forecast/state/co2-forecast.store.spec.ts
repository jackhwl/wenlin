import { HttpClientTestingModule } from '@angular/common/http/testing'
import { discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { Co2ForecastStore } from './co2-forecast.store'
import { first, skip, take } from 'rxjs/operators'
import { Observable, of, range, throwError } from 'rxjs'
import { Co2EmissionPrognosisHttp } from '../http/co2-emission-prognosis-http.service'
import { Co2EmissionPrognosisRecords } from '../http/co2-emission-prognosis-record'
import { Interval } from 'luxon'

describe(Co2ForecastStore.name, () => {
    function setup({
        httpGetSpy = jest.fn().mockReturnValue(of([]))
    }: {
        readonly httpGetSpy?: jest.Mock<Observable<Co2EmissionPrognosisRecords>, [Interval]>
    } = {}) {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [Co2ForecastStore]
        })

        const http = TestBed.inject(Co2EmissionPrognosisHttp)
        http.get = httpGetSpy
        const store = TestBed.inject(Co2ForecastStore)

        return {
            httpGetSpy,
            store
        }
    }

    it('is provided externally', async () => {
        const { store } = setup()

        expect(store).not.toBeNull()
    })

    describe('records$', () => {
        it('initially emits 0 records', async () => {
            const { store } = setup()

            const records = await store.records$.pipe(first()).toPromise()

            expect(records).toEqual([])
        })

        it('immediately emits records on success response from the CO2 Emission Progrosis API', async () => {
            // Arrange
            const expectedRecords: Co2EmissionPrognosisRecords = [
                {
                    CO2Emission: 80,
                    Minutes5UTC: new Date('2022-06-11T20:11-04:00'),
                    PriceArea: 'DK1'
                }
            ]
            const httpGetSpy = jest.fn().mockReturnValue(of(expectedRecords))
            const { store } = setup({ httpGetSpy })

            // Act
            const actualRecords = await store.records$
                .pipe(skip(1), take(1))
                .toPromise()

            // Assert
            expect(httpGetSpy).toHaveBeenCalledTimes(1)
            expect(actualRecords).toEqual(expectedRecords)
        })

        it('clears the records on error response from the CO2 Emission Progrosis API', async () => {
            // Arrange
            const httpGetSpy = jest.fn().mockReturnValue(throwError(new Error('Co2 Emission Api Error')))
            const { store } = setup({ httpGetSpy })

            // Act
            const actualRecords = await store.records$.pipe(skip(1), take(1)).toPromise()

            // Assert
            expect(httpGetSpy).toHaveBeenCalledTimes(1)
            expect(actualRecords).toEqual([])
        })

        it('queries the CO2 Emission Progrosis API every minute', fakeAsync (() => {
            // Arrange
            const oneMinutesMs = 60 * 1000
            const oneHourMinutes = 60
            const initialRequestCount = 1

            // Act
            const { httpGetSpy } = setup()
            // Initial effect
            tick(0)

            range(1, oneHourMinutes).forEach(minutesElaspsed => tick(oneMinutesMs))


            // Assert
            expect(httpGetSpy).toHaveBeenCalledTimes(initialRequestCount + oneHourMinutes)

            // Teardown
            discardPeriodicTasks()
        }))

    })
})