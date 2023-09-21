import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  errorEmailMessage: string = '';
  errorPasswordMessage: string = '';

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {}

  formUser = this.fb.group({
    email: ['' , [Validators.required, Validators.email]],
    password: ['' , Validators.required],
  });

  onSubmit() {
    this.errorEmailMessage = ''
    this.errorPasswordMessage = ''
    const user: any = {
      email: this.formUser.value.email,
      password: this.formUser.value.password
    }
    this.userService.loginUser(user).subscribe((token: any) => {
      console.log('comment ', token)
      localStorage.setItem('token', token.JWT);
      if(token.JWT){
        this.router.navigate(['/']);
        this.userService.setValor(true);
        this.formUser.reset()
      }
    }, (error: any) => {
      if(error.error.message === 'User not found'){
        this.errorEmailMessage = 'Email incorrecto'
      }
      if(error.error.message === 'Invalid password'){
        this.errorPasswordMessage = 'Contraseña incorrecta'
      }
    });
  }
}
