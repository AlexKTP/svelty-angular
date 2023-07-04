import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TrackService } from './track.service';
import { ITrack } from 'src/app/models/track.interface';
import { HttpClientModule } from '@angular/common/http';

const dummyTracks: ITrack[] = [
  {
    weight: 100,
    chest: 100,
    abs: 100,
    hip: 100,
    bottom: 100,
    leg: 100,
    date: new Date(),
    toSynchronize: false,
    userId: 1
  },
  {
    weight: 90,
    chest: 90,
    abs: 90,
    hip: 90,
    bottom: 90,
    leg: 90,
    date: new Date(),
    toSynchronize: false,
    userId: 1
  }
];

describe('TrackService (Unit tests)', () => {
  let service: TrackService;
  let httpMock: HttpTestingController;



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrackService]
    });
    service = TestBed.inject(TrackService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve tracks', () => {
    let apiUrl: string = "http://localhost:8080"
    spyOn(localStorage, 'getItem').and.returnValue('1');
    service.getTracks().subscribe(tracks => {
      let result = tracks as ITrack[];
      expect(result).toContain(dummyTracks[0]);
      expect(result).toContain(dummyTracks[1]);
      expect(result.length).toBe(2);
    });

    const bearer = localStorage.getItem('svelty-hero-id') as string

    var req = httpMock.expectOne(`${apiUrl}/tracks?userId=${bearer}`);
    spyOn(req.request.headers, 'get').and.returnValue(`Bearer ${bearer}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${bearer}`);
    expect(req.request.urlWithParams).toEqual(`${apiUrl}/tracks?userId=${bearer}`);
    req.flush(dummyTracks);

  });
  it('should not retrieve data if no Authorization header is provided', () => {
    let apiUrl: string = "http://localhost:8080"

    service.getTracks().subscribe({
      next: () => {
        fail('should have failed with the 401 error');
      },
      error: (error: any) => {
        expect(error.status).withContext('status').toEqual(401);
        expect(error.error).withContext('error').toEqual('Token is not valid or has expired');
      }
    });

    spyOn(localStorage, 'getItem').and.returnValue(null);

    const req = httpMock.expectOne(`${apiUrl}/tracks?userId=null`);
    console.log('authorization: ' + req.request.headers.get('Authorization'));
    expect(req.request.headers.has('Authorization')).toBeTrue();

    req.flush('Token is not valid or has expired', { status: 401, statusText: 'Unauthorized' });
  });

});

describe('TrackService (Integration Tests)', () => {
  let service: TrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],  // Use the real HttpClient
      providers: [TrackService]
    });

    service = TestBed.inject(TrackService);
  });

  it('should throw an error if no valid token is provided', (done) => {
    service.getTracks().subscribe({
      next: () => {
        fail('should have failed with the 401 error');
      },
      error: (error: any) => {
        expect(error.status).withContext('status').toEqual(401);
        expect(error.error).withContext('error').toEqual('Token is not valid or has expired');
        done();
      }
    });
  });





});





