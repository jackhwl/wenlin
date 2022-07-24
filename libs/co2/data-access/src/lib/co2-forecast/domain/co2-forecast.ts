import { DateTime } from "luxon"

export interface Co2ForecastDataPoint {
    readonly co2Emission: number
    readonly minutes5UTC: DateTime
    readonly priceArea: 'DK1' | 'DK2'
}

export type Co2Forecast = readonly Co2ForecastDataPoint[]