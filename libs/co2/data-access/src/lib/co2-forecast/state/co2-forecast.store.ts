import { Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { Observable, timer, combineLatest } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Co2EmissionPrognosisHttp } from '../http/co2-emission-prognosis-http.service'
import { Co2EmissionPrognosisRecord, Co2EmissionPrognosisRecords } from '../http/co2-emission-prognosis-record'
import { DateTime, Duration, Interval } from 'luxon'
import { torontoZone } from '../date-time-util/toronto-zone'

const twoDays = Duration.fromISO('P2D')

interface Co2ForecastState {
    readonly torontoToday: DateTime
    readonly records: Co2EmissionPrognosisRecords
}

@Injectable()
export class Co2ForecastStore extends ComponentStore<Co2ForecastState>{
    private torontoToday$: Observable<DateTime> = this.select(
        state => state.torontoToday
    ) 

    records$: Observable<Co2EmissionPrognosisRecords> = this.select(
        state => state.records,
        { debounce: true }
    )
    
    constructor(private http: Co2EmissionPrognosisHttp) {
        super(createInitialState(DateTime.now()))

        this.loadRecordsEveryMinute(this.torontoToday$)
    }

    private loadRecordsEveryMinute = this.effect<DateTime>(torontoToday$ => 
        combineLatest([torontoToday$, timer(0, 60 * 1000)]).pipe(
            switchMap(([torontoToday]) => this.http.get(Interval.fromDateTimes(torontoToday, torontoToday.plus(twoDays))).pipe(
                tapResponse(
                    //records => this.patchState({records}),
                    records => this.updateRecords(records),
                    () => this.updateRecords([])
                )
            ))
        )
    )

    private updateRecords = this.updater<Co2EmissionPrognosisRecords>(
        (state, records): Co2ForecastState => ({
        ...state,
        records
    }))
}

function createInitialState(now: DateTime): Co2ForecastState {
    return {
        torontoToday: now.setZone(torontoZone).startOf('day'),
        records: []
    }
}