import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css'],
})
export class AdministracionComponent {
  productsActive: boolean = true;
  categoryActive: boolean = false;

  userLoginOn: boolean = false;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
        if (!userLoginOn) {
          this.router.navigate(['/inicio']);
        }
      },
    });
  }


  switchActive(mode: string) {
    if (mode === 'products') {
      this.productsActive = true;
      this.categoryActive = false;
    } else if (mode === 'categories') {
      this.productsActive = false;
      this.categoryActive = true;
    }

  }



}
