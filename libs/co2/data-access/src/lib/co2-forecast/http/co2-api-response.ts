export interface Co2ApiResponse<TRecord>{
    readonly total: number,
    readonly limit: number,
    readonly dataset: string,
    readonly records: TRecord[]
}
