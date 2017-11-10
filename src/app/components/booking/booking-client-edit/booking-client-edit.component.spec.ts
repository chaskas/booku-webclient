import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingClientEditComponent } from './booking-client-edit.component';

describe('BookingClientEditComponent', () => {
  let component: BookingClientEditComponent;
  let fixture: ComponentFixture<BookingClientEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingClientEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingClientEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
