import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLogInComponent } from './form-log-in.component';

describe('FormLogInComponent', () => {
  let component: FormLogInComponent;
  let fixture: ComponentFixture<FormLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormLogInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
