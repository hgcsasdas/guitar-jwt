import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  imagePath: string = 'assets/imgs/guitarraPng.png';
  isMenuOpen: boolean = false;

  constructor(private loginService:LoginService, private router:Router) { }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  ngOnInit(): void {
  }
  logout()
  {
    this.loginService.logout();
    this.router.navigate(['/inicio'])
  }
}
