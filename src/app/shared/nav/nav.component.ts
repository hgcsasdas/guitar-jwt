import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  userLoginOn:boolean=false;
  isNavOpen: boolean = false;
  imagePath: string = 'assets/imgs/guitarraPng.png';

  constructor(private loginService:LoginService, private router:Router) { }



  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    )
  }

  logout()
  {
    this.loginService.logout();
    this.router.navigate(['/inicio'])
  }

}
