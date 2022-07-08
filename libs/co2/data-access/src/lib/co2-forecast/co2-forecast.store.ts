import { Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { Observable, timer, combineLatest } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Co2EmissionPrognosisHttp } from './co2-emission-prognosis-http.service'
import { Co2EmissionPrognosisRecord, Co2EmissionPrognosisRecords } from './co2-emission-prognosis-record'
import { DateQuery } from './date-query'

interface Co2ForecastState {
    readonly records: Co2EmissionPrognosisRecords
}

@Injectable()
export class Co2ForecastStore extends ComponentStore<Co2ForecastState>{
    records$: Observable<Co2EmissionPrognosisRecords> = this.select(
        state => state.records,
        { debounce: true }
    )
    
    constructor(private http: Co2EmissionPrognosisHttp) {
        super(initialState)

        this.loadRecordsEveryMinute({
            from: new Date(),
            to: new Date()
        })
    }

    private loadRecordsEveryMinute = this.effect<DateQuery>(queryFilters$ => 
        combineLatest([queryFilters$, timer(0, 60 * 1000)]).pipe(
            switchMap(queryFilter => this.http.get({
                from: new Date(),
                to: new Date()
            }).pipe(
                tapResponse(
                    //records => this.patchState({records}),
                    records => this.updateRecords(records),
                    () => this.updateRecords([])
                )
            ))
        )
    )

    private updateRecords = this.updater<Co2EmissionPrognosisRecords>((state, records) => ({
        ...state,
        records
    }))
}

const initialState: Co2ForecastState = {
    records: []
}