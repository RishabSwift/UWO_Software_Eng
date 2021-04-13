import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAupPolicyComponent } from './admin-aup-policy.component';

describe('AdminAupPolicyComponent', () => {
  let component: AdminAupPolicyComponent;
  let fixture: ComponentFixture<AdminAupPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAupPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAupPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
