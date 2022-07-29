import { Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { Observable, timer, combineLatest } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Co2EmissionPrognosisHttp } from '../http/co2-emission-prognosis-http.service'
import { Co2EmissionPrognosisRecord, Co2EmissionPrognosisRecords, Co2EmissionPrognosisRecords as Co2ForecastItem } from '../http/co2-emission-prognosis-record'
import { DateTime, Duration, Interval } from 'luxon'
import { TorontoDateStore, torontoZone } from '@wenlin-site/co2/util-date-times'
import { Co2Forecast } from '@wenlin-site/co2/domain'
import { Co2EmissionPrognosisResponse } from '../http/co2-emission-prognosis-response-item'

const twoDays = Duration.fromISO('P2D')

interface Co2ForecastState {
    readonly forecast: Co2Forecast
}

@Injectable()
export class Co2ForecastStore extends ComponentStore<Co2ForecastState>{
    forecast$: Observable<Co2Forecast> = this.select(
        state => state.forecast,
        { debounce: true }
    )
    
    constructor(private http: Co2EmissionPrognosisHttp, torontoDate: TorontoDateStore) {
        super(initialState)

        this.loadRecordsEveryMinute(torontoDate.today$)
    }

    private loadRecordsEveryMinute = this.effect<DateTime>(torontoToday$ => 
        combineLatest([torontoToday$, timer(0, 60 * 1000)]).pipe(
            switchMap(([torontoToday]) => this.http.get(Interval.fromDateTimes(torontoToday, torontoToday.plus(twoDays))).pipe(
                tapResponse(
                    //records => this.patchState({records}),
                    result => this.updateForecast(result),
                    () => this.updateForecast([])
                )
            ))
        )
    )

    private updateForecast = this.updater<Co2EmissionPrognosisResponse>(
        (state, response): Co2ForecastState => ({
        ...state,
        forecast: response
    }))
}

const initialState: Co2ForecastState = {
    forecast: [],
}