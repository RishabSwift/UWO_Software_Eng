import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesInScheduleComponent } from './courses-in-schedule.component';

describe('CoursesInScheduleComponent', () => {
  let component: CoursesInScheduleComponent;
  let fixture: ComponentFixture<CoursesInScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesInScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesInScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
