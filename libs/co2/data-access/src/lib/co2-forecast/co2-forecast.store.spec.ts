import { TestBed } from '@angular/core/testing'
import { Co2ForecastStore } from './co2-forecast.store'
import { first } from 'rxjs/operators'

describe(Co2ForecastStore.name, () => {
    function setup() {
        TestBed.configureTestingModule({
            providers: [Co2ForecastStore]
        })
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
    })
})