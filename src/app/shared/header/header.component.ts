import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { UserService } from '../../services/user/user.service';
import { UserRequestGUbU } from '../../services/user/requests/userRequestGUbU';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userLoginOn: boolean = false;
  userIsAdmin: boolean = false;

  imagePath: string = 'assets/imgs/guitarraPng.png';
  isMenuOpen: boolean = false;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
        if (userLoginOn) {
          const storedUsername = sessionStorage.getItem('username');
          if (storedUsername) {
            const requestObject: UserRequestGUbU = {
              usernameToSearch: storedUsername,
              usernameSearching: storedUsername,
            };

            this.userService.getUserRole(requestObject).subscribe({
              next: (isAdmin) => {
                this.userIsAdmin = isAdmin;
              },
              error: (error) => {
                console.error('Error fetching user role:', error);
                this.userIsAdmin = false;
              },
            });
          } else {
            // El usuario no se encuentra en el local storage
            this.userIsAdmin = false;
          }
        } else {
          this.userIsAdmin = false;
        }
      },
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/inicio']);
  }
}
