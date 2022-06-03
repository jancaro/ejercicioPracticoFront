import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsComponent } from './accounts.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

describe('AccountsComponent', () => {
  let component: AccountsComponent;
  let fixture: ComponentFixture<AccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsComponent ],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('Formulario invalido y boton deshabilitado', () => {
    const formAccountElement: HTMLFormElement = fixture.debugElement.nativeElement.querySelector('#formAccount');
    const buttonSubmitAccountElement: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#buttonSubmitAccount');
    expect(buttonSubmitAccountElement.disabled).toBeTruthy();
    expect(formAccountElement.reportValidity()).toBeFalsy();
  })

});
