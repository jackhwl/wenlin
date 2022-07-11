import { DateTime } from "luxon"
import { createCo2ForecastInteval } from "./create-co2-forecast-inteval"

describe(createCo2ForecastInteval.name, () => {
    it('the start of today is the beginning of the forecast', () => {
        const fakeNow = DateTime.fromISO('2022-07-10T20:52:00-04:00')

        const actualInterval = createCo2ForecastInteval(fakeNow)

        expect(actualInterval.start).toEqual(
            DateTime.fromISO('2022-07-10T00:00:00-04:00')
        )
    })

    it('the start of the day after tomorrow is the end of the forecast', () => {
        const fakeNow = DateTime.fromISO('2022-07-10T20:52:00-04:00')

        const actualInterval = createCo2ForecastInteval(fakeNow)

        expect(actualInterval.end).toEqual(
            DateTime.fromISO('2022-07-12T00:00:00-04:00')
        )
    })
})