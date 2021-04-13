import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPagesComponent } from './policy-pages.component';

describe('PolicyPagesComponent', () => {
  let component: PolicyPagesComponent;
  let fixture: ComponentFixture<PolicyPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
