import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/model/user.interface';
import { ConfirmedValidator } from 'src/app/pages/registration/password';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changes-password',
  templateUrl: './changes-password.component.html',
  styleUrls: ['./changes-password.component.scss']
})
export class ChangesPasswordComponent {
  username = '';
  updateUse: user = {};
  errorPasswordMessage: string = '';

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsername().subscribe((res: any) => {
      console.log('res ', res._id)
      this.username = res.name
      this.changePasswordForm.patchValue({
        _id: res._id
      });
    });
  }

  get passwordOld(){
    return this.changePasswordForm.get('oldPassword') as FormControl
  }

  get _id(){
    return this.changePasswordForm.get('_id') as FormControl
  }

  get newPassword(){
    return this.changePasswordForm.get('newPassword') as FormControl
  }

  get confirmPassword(){
    return this.changePasswordForm.get('confirmNewPassword') as FormControl
  }

  changePasswordForm = this.formBuilder.group({
    _id: [{ value: ''}],
    oldPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmNewPassword: ['', Validators.required],
  },{ 
    validator: ConfirmedValidator('newPassword', 'confirmNewPassword')
  });

  onSubmit(){
    this.updateUse = {
      name: this.username,
      password: this.passwordOld.value
    }
    this.userService.verifyPassword(this.updateUse).subscribe((res: any) => {
      if(res.success){
        this.updateUser()
      }
    }, (error: any) => {
      console.log('err', error. message)
      console.log('err', error)
      if(error.error.message === "Invalid password"){
        console.log('err', error. message)
        this.errorPasswordMessage = 'Contraseña incorrecta. Intente de nuevo.', error;
      }
    })
  }

  updateUser(){
    const user = {
      password : this.newPassword.value
    }
    console.log('_id', this._id)
    this.userService.updateUserPassword(this._id.value, user).subscribe((user: user) => {
      console.log('comment ', user)
      if(user){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Editado con exito!!',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }, (error) => {
      console.error('Error en el registro', error);
    });
  }
}
//$2b$10$blXJC903qqJYrl7/EWQaguHbISqF9gYiBcHcErExeJSLZBAyezlbi