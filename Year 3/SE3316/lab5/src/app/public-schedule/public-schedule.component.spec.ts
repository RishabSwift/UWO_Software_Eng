import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicScheduleComponent } from './public-schedule.component';

describe('PublicScheduleComponent', () => {
  let component: PublicScheduleComponent;
  let fixture: ComponentFixture<PublicScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
