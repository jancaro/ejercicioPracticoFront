import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsComponent } from './clients.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsComponent ],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('Formulario invalido y boton deshabilitado', () => {
    const formClientElement: HTMLFormElement = fixture.debugElement.nativeElement.querySelector('#formClient');
    const buttonSubmitClientElement: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#buttonSubmitClient');
    expect(buttonSubmitClientElement.disabled).toBeFalsy();
    expect(formClientElement.reportValidity()).toBeFalsy();
  })

});
