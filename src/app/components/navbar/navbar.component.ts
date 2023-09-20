import { Component, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { user } from '../../model/user.interface'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn = false;
  username: any;
  isMenuOpen = false; // Variable para controlar si el menú desplegable está abierto o cerrado

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isAuthenticated();

    if (this.isLoggedIn) {
      console.log('entra en is lo  ')
      this.userService.getUsername().subscribe((user: user) => {
        console.log('user ', user)
        this.username = user.name
      });
    }
  }

  toggleMenu() {
    console.log('toggle', this.username)
      this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.userService.logout()
    this.isLoggedIn = false;
    this.username = '';
    this.router.navigate(['/']); 
  }

}
