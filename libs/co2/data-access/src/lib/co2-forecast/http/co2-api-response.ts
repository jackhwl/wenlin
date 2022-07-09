export interface Co2ApiResponse<TRecord>{
    readonly help: string
    readonly result: {
        // readonly include_total: boolean,
        // readonly resource_id: string,
        readonly fields: [],
        readonly records: TRecord[],
        // readonly _links: {
        //     readonly start: string,
        //     readonly next: string
        // },
        // readonly total: number
    }
    readonly success: true
}
