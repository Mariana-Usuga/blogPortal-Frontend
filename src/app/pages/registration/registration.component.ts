import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/model/user.interface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {}

  get name(){
    return this.formUser.get('name') as FormControl
  }

  get email(){
    return this.formUser.get('email') as FormControl
  }

  get password(){
    return this.formUser.get('password') as FormControl
  }

  get confirmPassword(){
    return this.formUser.get('confirmPassword') as FormControl
  }

  matchPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const conPassword = control.get('confirmPassword')?.value;
  
    if (password === conPassword) {
      return null; // Las cxontraseñas coinciden, no hay error
    } else {
      return { 'passwordMismatch': true }; // Las contraseñas no coinciden, se produce un error
    }
  }
  

  formUser = this.fb.group({
    'name': ['', Validators.required],
    'email': ['', Validators.required, Validators.email],
    'password': ['', Validators.required],
    'confirmPassword': ['', [Validators.required, this.matchPasswords.bind(this)]],
  });

  onSubmit() {
    console.log('this ', this.formUser.value)
    /*this.userService.postUser(this.formUser?.value).subscribe((user) => {
      console.log('comment ', user)
      //this.newUser.content = '';
      if(user){
        this.router.navigate(['/login']); 
      }
    }, (error) => {
      // Manejar errores, por ejemplo, mostrar un mensaje de error.
      console.error('Error en el registro', error);
    });*/
  }
}
