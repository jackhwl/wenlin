
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { Co2EmissionPrognosisHttp } from './co2-emission-prognosis-http.service'
import { Co2EmissionPrognosisRecord, Co2EmissionPrognosisRecords } from './co2-emission-prognosis-record'
import { energiDataServiceEndpoint } from './energi-data-service-endpoint'
import { Co2ApiResponse } from './co2-api-response'

describe(Co2EmissionPrognosisHttp.name, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        })

        http = TestBed.inject(Co2EmissionPrognosisHttp)
        controller = TestBed.inject(HttpTestingController)
    })

    afterEach(() => {
        controller.verify()
    })

    let http: Co2EmissionPrognosisHttp
    let controller: HttpTestingController

    it('maps successful response to records', () => {
        // Arrange
        const records = [
            {
                co2Emission: 100,
                minutes5UTC: new Date('2022-06-11T10:16+08:00'),
                priceArea: 'DK2'
            }
        ]
        const co2ApiReponse = {
            help: 'help me',
            result: {
                fields: [],
                records
            },
            success: true
        }

        // Act
        const whenResponse = http.get().toPromise()
        const testRequest = controller.expectOne(request => 
            request.method === 'GET' && request.url.startsWith(energiDataServiceEndpoint)
        )
        testRequest.flush(co2ApiReponse)

        // Assert
        expect(whenResponse).resolves.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    co2Emission: expect.any(Number),
                    minutes5UTC: expect.any(Date),
                    priceArea: expect.any(String)
                } as Co2EmissionPrognosisRecord)
            ])
        )
    })

    it('emits an array for successful responses', () => {
        // Arrange
        const records = [
            {
                co2Emission: 100,
                minutes5UTC: new Date('2022-06-11T10:16+08:00'),
                priceArea: 'DK2'
            }
        ]
        const co2ApiReponse = {
            help: 'help me',
            result: {
                fields: [],
                records
            },
            success: true
        }

        // Act
        const whenResponse = http.get().toPromise()
        const testRequest = controller.expectOne(request => 
            request.method === 'GET' && request.url.startsWith(energiDataServiceEndpoint)
        )
        testRequest.flush(co2ApiReponse)

        // Assert
        expect(whenResponse).resolves.toEqual(
            expect.any(Array)
        )
    })    

    it('emits an error for error responses', () => {
        // Arrange
        const co2ApiErrorsReponse = {
            help: 'help me',
            success: false
        }

        // Act
        const whenErrorResponse = http.get().toPromise()
        const testRequest = controller.expectOne(request => 
            request.method === 'GET' && request.url.startsWith(energiDataServiceEndpoint)
        )
        testRequest.flush(co2ApiErrorsReponse)

        // Assert
        expect(whenErrorResponse).rejects.toEqual(
            expect.any(Error)
        )
    })    
})