import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';


import { QuotesService } from './quotes.service';

describe('QuotesService (Integration Test)', () => {
  let service: QuotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [QuotesService]
    });
    service = TestBed.inject(QuotesService);
  }
  );

  it('#getRandomQuote should return a random quote', () => {
    service.getRandomQuote().subscribe(quote => {
      console.log("quote is : " + quote)
      expect((quote as any).content.lenght).toBeGreaterThan(0);
    });
  });

  it('#getQuotes should return a list of quotes', () => {
    service.getQuotes().subscribe(quotes => {
      let result = quotes as any[];
      expect(result.length).toBeGreaterThan(0);
    });
  }
  );

});


describe('QuotesService (Unit test)', () => {
  let service: QuotesService;
  let httpMock: HttpTestingController;

  let fakeQuotes = [
    {
      "_id": "J5S_pwTvaT",
      "content": "Yesterday is history, tomorrow is a mystery, today is God's gift, that's why we call it the present.",
      "author": "Joan Rivers",
      "tags": ["Wisdom"],
      "authorSlug": "joan-rivers",
      "length": 100,
      "dateAdded": "2019-10-12",
      "dateModified": "2023-04-14"
    },
    {
      "_id": "NZx4vMwOCDxJ",
      "content": "There is only one happiness in life, to love and be loved.",
      "author": "George Sand",
      "tags": ["Famous Quotes"],
      "authorSlug": "george-sand",
      "length": 58,
      "dateAdded": "2019-10-18",
      "dateModified": "2023-04-14"
    }
  ]

  const apiUrl: string = 'https://api.quotable.io/'


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuotesService]
    });
    service = TestBed.inject(QuotesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  it('should retrieve quotes', () => {
    service.getQuotes().subscribe(quotes => {
      let result = quotes as any[];
      expect(result).toContain(fakeQuotes[0]);
      expect(result).toContain(fakeQuotes[1]);
      expect(result.length).toBe(2);
    });

    const req = httpMock.expectOne(`${apiUrl}quotes`);
    expect(req.request.method).toBe('GET');
    req.flush(fakeQuotes);
  });


  it('should handle errors', () => {
    spyOn
    service.getRandomQuote().subscribe({
      next: () => {
        fail('should have failed with the 401 error');
      },
      error: (error: any) => {
        expect(error.status).withContext('status').toEqual(401);
        expect(error.error).withContext('error').toEqual('should have failed with the 401 error');
      }
    });
    const req = httpMock.expectOne('https://api.quotable.io/random');
    req.flush('should have failed with the 401 error', { status: 401, statusText: 'should have failed with the 401 error' });
  });
});
