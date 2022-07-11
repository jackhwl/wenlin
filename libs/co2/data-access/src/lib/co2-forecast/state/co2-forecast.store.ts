import { Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { Observable, timer, combineLatest } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Co2EmissionPrognosisHttp } from '../http/co2-emission-prognosis-http.service'
import { Co2EmissionPrognosisRecord, Co2EmissionPrognosisRecords } from '../http/co2-emission-prognosis-record'
import { DateTime, Interval } from 'luxon'
import { createCo2ForecastInteval } from './create-co2-forecast-inteval'

interface Co2ForecastState {
    readonly interval: Interval
    readonly records: Co2EmissionPrognosisRecords
}

@Injectable()
export class Co2ForecastStore extends ComponentStore<Co2ForecastState>{
    private interval$: Observable<Interval> = this.select(
        state => state.interval
    ) 

    records$: Observable<Co2EmissionPrognosisRecords> = this.select(
        state => state.records,
        { debounce: true }
    )
    
    constructor(private http: Co2EmissionPrognosisHttp) {
        super(createInitialState(DateTime.now()))

        this.loadRecordsEveryMinute(this.interval$)
    }

    private loadRecordsEveryMinute = this.effect<Interval>(inteval$ => 
        combineLatest([inteval$, timer(0, 60 * 1000)]).pipe(
            switchMap(([inteval]) => this.http.get(inteval).pipe(
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

function createInitialState(now: DateTime): Co2ForecastState {
    return {
        interval: createCo2ForecastInteval(now),
        records: []
    }
}