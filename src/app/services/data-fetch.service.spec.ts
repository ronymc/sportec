import { TestBed } from '@angular/core/testing';

import { DataFetchService } from './data-fetch.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('DataFetchService', () => {
  let service: DataFetchService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DataFetchService);
  });

  it('should call getMatches with correct url', () => {
    service.getMatches('SE_1', 'SPT_1').subscribe();

    httpTestingController.expectOne('assets/data.xml');
  });
});
