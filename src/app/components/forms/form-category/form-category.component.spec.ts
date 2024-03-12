import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCategoryComponent } from './form-category.component';

describe('FormCategoryComponent', () => {
  let component: FormCategoryComponent;
  let fixture: ComponentFixture<FormCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
