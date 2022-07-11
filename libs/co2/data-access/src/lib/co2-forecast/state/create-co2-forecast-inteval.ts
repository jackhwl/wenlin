import { DateTime, Duration, Interval } from "luxon";
import { torontoZone } from "../date-time-util/toronto-zone";


export function createCo2ForecastInteval(now: DateTime): Interval {
    const torontoToday = now.setZone(torontoZone).startOf('day')
    const torontoDayAfterTomorrow = torontoToday.plus(Duration.fromISO('P2D'))

    return Interval.fromDateTimes(torontoToday, torontoDayAfterTomorrow)
}