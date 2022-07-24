import { DateTime } from "luxon"

export interface Co2EmissionPrognosisResponseItem {
    readonly co2Emission: number
    readonly minutes5UTC: DateTime
    readonly priceArea: 'DK1' | 'DK2'
}

export type Co2EmissionPrognosisResponse = readonly Co2EmissionPrognosisResponseItem[]