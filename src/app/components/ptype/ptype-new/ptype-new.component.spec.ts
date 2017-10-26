import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtypeNewComponent } from './ptype-new.component';

describe('PtypeNewComponent', () => {
  let component: PtypeNewComponent;
  let fixture: ComponentFixture<PtypeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtypeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtypeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
