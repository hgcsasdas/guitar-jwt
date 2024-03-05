import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';
import { UserService } from '../../services/user/user.service';
import { UserRequestGUbU } from '../../services/user/requests/userRequestGUbU';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css'],
})
export class PersonalDetailsComponent {
  errorMessage: String = '';
  user?: User;
  userLoginOn: boolean = false;
  editMode: boolean = false;

  registerForm = this.formBuilder.group({
    id: [''],
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    country: ['', Validators.required],
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.registerForm = this.formBuilder.group({
      id: [''],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      country: ['', Validators.required],
    });

    const username = sessionStorage.getItem('username');

    if (username) {
      const userRequest: UserRequestGUbU = {
        usernameToSearch:username,
        usernameSearching: username
      };

      this.userService.getUserByUsername(userRequest).subscribe({
        next: (userData) => {
          this.user = userData;
          this.registerForm.setValue({
            id: userData.id.toString(),
            firstname: userData.firstname,
            lastname: userData.lastname,
            country: userData.country,
          });
        },
        error: (errorData) => {
          this.errorMessage = errorData;
        },
        complete: () => {
          console.info('User Data ok');
        },
      });
    }

    this.loginService.userLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;

        if (!userLoginOn) {
          this.registerForm.reset();
        }
      },
    });
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

  savePersonalDetailsData() {
    if (this.registerForm.valid) {
      this.userService
        .updateUser(this.registerForm.value as unknown as User)
        .subscribe({
          next: () => {
            this.editMode = false;
            this.user = this.registerForm.value as unknown as User;
          },
          error: (errorData) => console.error(errorData),
        });
    }
  }
}
