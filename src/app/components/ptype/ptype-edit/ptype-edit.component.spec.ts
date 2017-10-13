import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtypeEditComponent } from './ptype-edit.component';

describe('PtypeEditComponent', () => {
  let component: PtypeEditComponent;
  let fixture: ComponentFixture<PtypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
