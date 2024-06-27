import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmpleadosComponent } from './edit-empleados.component';

describe('EditEmpleadosComponent', () => {
  let component: EditEmpleadosComponent;
  let fixture: ComponentFixture<EditEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEmpleadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
