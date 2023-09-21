import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
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
  isMenuOpen = false;
  valor: string = '';

  constructor(private userService: UserService, private router: Router, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isAuthenticated();

    this.userService.getValor().subscribe((valor) => {
      this.userService.getUsername().subscribe((user: user) => {
        this.username = user.name
        this.userService.setName(this.username)
      });
      this.isLoggedIn = valor;
      this.cdRef.detectChanges(); 
    });
  }

  toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.userService.logout()
    this.isLoggedIn = false;
    this.username = '';
    this.router.navigate(['/']); 
  }

}
