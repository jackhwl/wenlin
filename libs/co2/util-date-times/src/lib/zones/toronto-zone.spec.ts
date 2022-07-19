import { torontoZone } from "./toronto-zone";

describe(torontoZone.name, () => {
    it('is the Toronto time zone', () => {
        expect(torontoZone.name).toBe('America/Toronto')
    })

    it('is a valid zone', () => {
        expect(torontoZone.isValid).toBe(true)
    })
})