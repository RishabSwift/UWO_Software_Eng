import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseListComponent } from './create-course-list.component';

describe('CreateCourseListComponent', () => {
  let component: CreateCourseListComponent;
  let fixture: ComponentFixture<CreateCourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCourseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
