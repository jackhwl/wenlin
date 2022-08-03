import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { torontoZone } from '../zones/toronto-zone';

interface TorontoDateState {
    readonly today: DateTime;
}

@Injectable({
    providedIn: 'root'
})
export class TorontoDateStore extends ComponentStore<TorontoDateState> {
    today$: Observable<DateTime> = this.select(state => state.today)

    constructor() {
        super()

        this.setState(createInitialState(this.today()))
    }
    
    private now(): DateTime {
        return DateTime.now().setZone(torontoZone)
    }

    private today(): DateTime {
        return this.now().startOf('day')
    }
}

function createInitialState(torontoToday: DateTime): TorontoDateState {
    return {
        today: torontoToday
    }
}