import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication-service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';

  entries = [
    {
      name: 'Login',
      link: 'login',
    },
    {
      name: 'Register',
      link: 'register',
    },
    {
      name: 'Update Profile',
      link: 'update-profile',
    },
  ];
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  navigateTo(value: string) {
    this.router.navigate(['../', value]);
  }

  logout() {
    this.authService.logout();
  }
}
