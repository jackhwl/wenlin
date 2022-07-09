import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { Co2EmissionPrognosisRecord, Co2EmissionPrognosisRecords } from './co2-emission-prognosis-record'
import { Co2ApiResponse } from './co2-api-response'
import { Co2ApiErrorsResponse } from './co2-api-errors-response'
import { energiDataServiceEndpoint, energiDataSqlServiceEndpoint } from './energi-data-service-endpoint'
import { DateQuery } from '../date-query'

@Injectable({
    providedIn: 'root'
})

export class Co2EmissionPrognosisHttp {
    constructor(private http: HttpClient){}

    get(dateQuery: DateQuery): Observable<Co2EmissionPrognosisRecords> {
        return this.http.get<Co2ApiResponse<Co2EmissionPrognosisRecord> | Co2ApiErrorsResponse>(energiDataServiceEndpoint, {
            params: {
                offset: 0,
                limit: 5,
                start: dateQuery.start.toISOString(),
                end: dateQuery.end.toISOString()
            }
        }).pipe(
            mergeMap(response => 
                response.success 
                ? of(response.result.records.map(record => ({ 
                    ...record
                })))
                : throwError(new Error('Co2 API Error'))
            )
        )
    }

    // get_sql(dateQuery: DateQuery): Observable<Co2EmissionPrognosisRecords> {
    //     const sql = `SELECT "Minutes5UTC" AS "minutes5Utc" 
    //         ,"CO2Emission" AS "co2Emission"
    //         ,"PriceArea" AS "priceArea"
    //         FROM "co2emisprog"
    //         WHERE "Minutes5UTC" >= '${dateQuery.from.toISOString()}'
    //           AND "Minutes5UTC" <= '${dateQuery.to.toISOString()}'
    //         ORDER BY "Minutes5UTC" ASC ;
    //         `
    //     return this.http.get<CkanResponse<Co2EmissionPrognosisRecord> | CkanErrorsResponse>(energiDataSqlServiceEndpoint, {
    //         params: {
    //             sql
    //         }
    //     }).pipe(
    //         mergeMap(response => 
    //             response.success 
    //             ? of(response.result.records.map(record => ({ 
    //                 ...record,
    //                 minutes5UTC: new Date(record.minutes5UTC)
    //             })))
    //             : throwError(new Error('Co2 API Error'))
    //         )
    //     )
    // }
}