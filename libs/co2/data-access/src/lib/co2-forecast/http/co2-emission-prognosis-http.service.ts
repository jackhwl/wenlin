import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { Co2EmissionPrognosisRecord, Co2EmissionPrognosisRecords } from './co2-emission-prognosis-record'
import { Co2ApiResponse } from './co2-api-response'
import { Co2ApiErrorsResponse } from './co2-api-errors-response'
import { energiDataServiceEndpoint, energiDataSqlServiceEndpoint } from './energi-data-service-endpoint'
import { DateTime, Interval } from 'luxon'
import { Co2EmissionPrognosisResponse } from './co2-emission-prognosis-response-item'

@Injectable({
    providedIn: 'root'
})

export class Co2EmissionPrognosisHttp {
    constructor(private http: HttpClient){}

    get(interval: Interval): Observable<Co2EmissionPrognosisResponse> {
        return this.http.get<Co2ApiResponse<Co2EmissionPrognosisRecord>>(energiDataServiceEndpoint, {
            params: {
                offset: 0,
                limit: 0,
                start: interval.start.toUTC().toISODate(),
                end: interval.end.toUTC().toISODate()
            }
        }).pipe(
            mergeMap(response => 
                response.total > 0
                ? of(response.records.map(record => ({ 
                    ...record,
                    Minutes5UTC: DateTime.fromISO(record.Minutes5UTC)
                })))
                : throwError(new Error('Co2 API Error:' + JSON.stringify(response)))
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