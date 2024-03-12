import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../../services/auth/register.service';
import { RegisterRequest } from '../../../services/auth/requests/registerRequest';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent implements OnInit {
  errorMessage: string = '';
  successMessage: string = '';
  registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    country: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {}

  register() {
    this.errorMessage = '';
    this.successMessage = '';
    if (this.registerForm.valid) {

      this.errorMessage = '';
      this.registerService
        .register(this.registerForm.value as RegisterRequest)
        .subscribe({
          next: (response) => {
            console.log(response);
            if (response.register) {
              this.successMessage = response.message;
              this.registerForm.reset();

            } else {
              this.errorMessage = response.message;
            }

          },
          error: (error) => {
            console.error(error);
            this.errorMessage =
              'Error al registrar. Por favor, inténtalo de nuevo.';
          },

        });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos.';
    }
  }

  get username() {
    return this.registerForm.controls.username;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get firstname() {
    return this.registerForm.controls.firstname;
  }

  get lastname() {
    return this.registerForm.controls.lastname;
  }

  get country() {
    return this.registerForm.controls.country;
  }
}
