import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { userLogin } from 'src/app/model/login.interface';
import { user } from 'src/app/model/user.interface';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formData: userLogin = {
    email: '',
    password: '',
  };

  constructor(private userService: UserService, private router: Router) {}


  onSubmit() {
    this.userService.loginUser(this.formData).subscribe((token: any) => {
      console.log('comment ', token)
      localStorage.setItem('token', token.JWT);
      this.formData = {
        email: '',
        password: '',
      };
      this.router.navigate(['/']); 
    }, (error: any) => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: error.error.message,
        showConfirmButton: false,
        timer: 2000
      })
      this.formData = {
        email: '',
        password: '',
      };
      console.error('Error en el registro', error.message);
      console.error('Error en el registro', error.error.message);
    });
  }
}
