import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtypeListComponent } from './ptype-list.component';

describe('PtypeListComponent', () => {
  let component: PtypeListComponent;
  let fixture: ComponentFixture<PtypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
