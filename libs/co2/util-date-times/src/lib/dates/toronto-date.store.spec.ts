import { DateTime, Settings } from 'luxon'
import { first } from 'rxjs/operators';
import { torontoZone } from '../zones/toronto-zone';
import { TorontoDateStore } from "./toronto-date.store";
import { TestBed } from '@angular/core/testing';

describe(TorontoDateStore.name, () => {
    describe('today$', () => {
        it('emits the start of the current Toronto date', async () => {
            // Arrange
            const _now = Settings.now
            const fakeNow = DateTime.fromISO('2022-07-20T19:47:00', { zone: torontoZone})
            const expectedToday = DateTime.fromISO('2022-07-20T00:00:00', { zone: torontoZone})
            Settings.now = () => fakeNow.toMillis()
            const store = TestBed.inject(TorontoDateStore)

            // Act
            const actualToday = await store.today$.pipe(first()).toPromise()

            // Assert
            expect(actualToday).toEqual(expectedToday)

            // Teardown
            Settings.now = _now
        })
    })
})