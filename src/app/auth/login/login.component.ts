import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent  {
  showLoginForm: boolean = true;

  toggleForm(): void {
    this.showLoginForm = !this.showLoginForm;
  }
}
