import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/model/user.interface';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  isEditingName = false;
  isEditingEmail = false;
  isEditingPassword = false;
  originalUser!: any;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit() {
    this.userService.getUsername().subscribe((res: any) => {
      this.originalUser = res;
      this.formUser.patchValue(res);
    });
  }

  get name() {
    return this.formUser.get('name') as FormControl;
  }

  get email() {
    return this.formUser.get('email') as FormControl;
  }

  get _id() {
    return this.formUser.get('_id') as FormControl;
  }

  formUser = this.fb.group({
    _id: [{ value: '' }],
    name: [{ value: '', disabled: true }, Validators.required],
    email: [
      { value: '', disabled: true },
      [Validators.required, Validators.email],
    ],
  });

  toggleEditing(fieldName: string) {
    if (fieldName === 'name') {
      this.isEditingName = !this.isEditingName;
      this.name.enable();
    } else if (fieldName === 'email') {
      this.isEditingEmail = !this.isEditingEmail;
      this.email.enable();
    }
  }

  onSubmit() {
    const updateUser = {
      name: this.name.value,
      email: this.email.value,
    };
    this.userService.updateUser(this._id.value, updateUser).subscribe(
      (user: any) => {
        if (user) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Editado con exito!!',
            showConfirmButton: false,
            timer: 2000,
          });
        }
        this.formUser.patchValue(user);
        this.name.disable();
        this.email.disable();
        this.isEditingName = false;
        this.isEditingEmail = false;
      },
      (error) => {
        console.error('Error en el registro', error);
      },
    );
  }

  onCancel() {
    this.formUser.patchValue(this.originalUser);
    this.name.disable();
    this.email.disable();
    this.isEditingName = false;
    this.isEditingEmail = false;
  }
}
