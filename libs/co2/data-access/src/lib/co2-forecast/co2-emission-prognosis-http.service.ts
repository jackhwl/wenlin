import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { Co2EmissionPrognosisRecord, Co2EmissionPrognosisRecords } from './co2-emission-prognosis-record'
import { Co2ApiResponse } from './co2-api-response'
import { Co2ApiErrorsResponse } from './co2-api-errors-response'
import { energiDataServiceEndpoint } from './energi-data-service-endpoint'

@Injectable({
    providedIn: 'root'
})

export class Co2EmissionPrognosisHttp {
    constructor(private http: HttpClient){}

    get(): Observable<Co2EmissionPrognosisRecords> {
        return this.http.get<Co2ApiResponse<Co2EmissionPrognosisRecord> | Co2ApiErrorsResponse>(energiDataServiceEndpoint, {
            params: {
                resource_id: 'co2emisprog',
                limit: 5
            }
        }).pipe(
            mergeMap(response => 
                response.success 
                ? of(response.result.records.map(record => ({ 
                    ...record,
                    minutes5UTC: new Date(record.minutes5UTC)
                })))
                : throwError(new Error('Co2 API Error'))
            )
        )
    }
}