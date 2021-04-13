import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDmcaPolicyComponent } from './admin-dmca-policy.component';

describe('AdminDmcaPolicyComponent', () => {
  let component: AdminDmcaPolicyComponent;
  let fixture: ComponentFixture<AdminDmcaPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDmcaPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDmcaPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
