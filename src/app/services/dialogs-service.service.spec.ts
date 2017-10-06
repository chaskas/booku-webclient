import { TestBed, inject } from '@angular/core/testing';

import { DialogsServiceService } from './dialogs-service.service';

describe('DialogsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogsServiceService]
    });
  });

  it('should be created', inject([DialogsServiceService], (service: DialogsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
