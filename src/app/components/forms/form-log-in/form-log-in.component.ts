import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';
import { LoginRequest } from '../../../services/auth/requests/loginRequest';

@Component({
  selector: 'app-form-log-in',
  templateUrl: './form-log-in.component.html',
  styleUrl: './form-log-in.component.css'
})
export class FormLogInComponent {
  loginError: string = '';

  loginForm=this.formBuilder.group({
    username:['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
  })

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  login() {

    if(this.loginForm.valid) {
      this.loginError="";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          //El user data es el token que me genera
          //console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError = errorData;
        },
        complete: () => {
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");    }

  }


  get username() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }
}
