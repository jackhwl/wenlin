import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Co2EmissionPrognosisRecord } from './co2-emission-prognosis-record'

const url = "https://api.energidataservice.dk/datastore_search"
//?resource_id=co2emisprog&limit=5"

@Injectable({
    providedIn: 'root'
})

export class Co2EmissionPrognosisHttp {
    get(): Observable<readonly Co2EmissionPrognosisRecord[]> {
        return of([])
    }
}