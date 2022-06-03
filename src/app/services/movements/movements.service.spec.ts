import { TestBed } from '@angular/core/testing';

import { MovementsService } from './movements.service';
import {HttpClientModule} from "@angular/common/http";

describe('MovementsService', () => {
  let service: MovementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(MovementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
