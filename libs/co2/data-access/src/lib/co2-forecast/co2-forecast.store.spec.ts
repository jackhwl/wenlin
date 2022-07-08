import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { Co2ForecastStore } from './co2-forecast.store'
import { first, skip, take } from 'rxjs/operators'
import { Observable, of, throwError } from 'rxjs'
import { Co2EmissionPrognosisHttp } from './co2-emission-prognosis-http.service'
import { Co2EmissionPrognosisRecords } from './co2-emission-prognosis-record'

describe(Co2ForecastStore.name, () => {
    function setup({
        httpGetSpy = jest.fn().mockReturnValue(of([]))
    }: {
        readonly httpGetSpy?: jest.Mock<Observable<Co2EmissionPrognosisRecords>, []>
    } = {}) {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [Co2ForecastStore]
        })

        const http = TestBed.inject(Co2EmissionPrognosisHttp)
        http.get = httpGetSpy
        const store = TestBed.inject(Co2ForecastStore)

        return {
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
    })
})