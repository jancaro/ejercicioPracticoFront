import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsComponent } from './movements.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

describe('MovementsComponent', () => {
  let component: MovementsComponent;
  let fixture: ComponentFixture<MovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementsComponent ],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('Formulario invalido y boton deshabilitado v2', () => {
    const formMovementElement: HTMLFormElement = fixture.debugElement.nativeElement.querySelector('#formMovement');
    const buttonSubmitMovementElement: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#buttonSubmitMovement');
    expect(buttonSubmitMovementElement.disabled).toBeTruthy();
    expect(formMovementElement.reportValidity()).toBeFalsy();
  });

  test('Formulario invalido cuando está vacío ', () => {
    const formMovementElement: HTMLFormElement = fixture.debugElement.nativeElement.querySelector('#formMovement');
    expect(formMovementElement.reportValidity()).toBeFalsy();
  });

});
