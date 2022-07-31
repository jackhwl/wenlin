import { DateTime } from "luxon"

export interface Co2ForecastDataPoint {
    readonly CO2Emission: number
    readonly Minutes5UTC: DateTime
    readonly PriceArea: 'DK1' | 'DK2'
}

export type Co2Forecast = readonly Co2ForecastDataPoint[]