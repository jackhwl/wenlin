export interface Co2EmissionPrognosisRecord {
    readonly CO2Emission: number
    readonly Minutes5UTC: string
    readonly PriceArea: 'DK1' | 'DK2'
}

export type Co2EmissionPrognosisRecords = readonly Co2EmissionPrognosisRecord[]