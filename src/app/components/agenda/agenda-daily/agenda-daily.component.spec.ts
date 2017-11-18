import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaMonthlyComponent } from './agenda-monthly.component';

describe('AgendaMonthlyComponent', () => {
  let component: AgendaMonthlyComponent;
  let fixture: ComponentFixture<AgendaMonthlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaMonthlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
