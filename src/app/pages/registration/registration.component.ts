import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/model/user.interface';
import { UserService } from 'src/app/services/user/user.service';
import { ConfirmedValidator } from './password';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  get name() {
    return this.formUser.get('name') as FormControl;
  }

  get email() {
    return this.formUser.get('email') as FormControl;
  }

  get password() {
    return this.formUser.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.formUser.get('confirmPassword') as FormControl;
  }

  formUser = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: ConfirmedValidator('password', 'confirmPassword'),
    },
  );

  onSubmit() {
    const newUser: user = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
    };
    this.userService.postUser(newUser).subscribe(
      (user: user) => {
        if (user) {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error('Error en el registro', error);
      },
    );
  }
}
