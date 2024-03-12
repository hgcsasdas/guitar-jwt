import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSignOutComponent } from './button-sign-out.component';

describe('ButtonSignOutComponent', () => {
  let component: ButtonSignOutComponent;
  let fixture: ComponentFixture<ButtonSignOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonSignOutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonSignOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
