import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtypeDetailComponent } from './ptype-detail.component';

describe('PtypeDetailComponent', () => {
  let component: PtypeDetailComponent;
  let fixture: ComponentFixture<PtypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtypeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
