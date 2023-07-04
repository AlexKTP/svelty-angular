import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TrackService } from './track.service';
import { ITrack } from 'src/app/models/track.interface';

describe('TrackService', () => {
  let service: TrackService;
  let httpMock: HttpTestingController;

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
        expect(error.status).toEqual(401, 'status');
        expect(error.error).toContain('No Authorization header provided', 'message');
      }
    });

    spyOn(localStorage, 'getItem').and.returnValue(null);

    const req = httpMock.expectOne(`${apiUrl}/tracks?userId=null`);
    console.log('authorization: ' + req.request.headers.get('Authorization'));
    expect(req.request.headers.has('Authorization')).toBeTrue();

    req.flush('No Authorization header provided', { status: 401, statusText: 'Unauthorized' });
  });

});
