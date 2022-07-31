import { DateTime } from "luxon"

export interface Co2EmissionPrognosisResponseItem {
    readonly CO2Emission: number
    readonly Minutes5UTC: DateTime
    readonly PriceArea: 'DK1' | 'DK2'
}

export type Co2EmissionPrognosisResponse = readonly Co2EmissionPrognosisResponseItem[]