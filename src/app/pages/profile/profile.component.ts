import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/model/user.interface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  isEditingName = false;
  isEditingEmail = false;
  isEditingPassword = false;

  constructor(private userService: UserService, private router: Router) {}

  user: user = {
    name: '',
    email: '',
    password: '',
    articles: [],
    _id: '',
  };

  ngOnInit() {
    this.userService.getUsername().subscribe((res: user) => {
      console.log('res ', res)
      this.user = res;
    });
  }

  toggleEditing(fieldName: string) {
    if (fieldName === 'name') {
      this.isEditingName = !this.isEditingName;
    } else if (fieldName === 'email') {
      this.isEditingEmail = !this.isEditingEmail;
    }
  }

  onSubmit() {
    console.log('this.user?._id ', this.user?._id)
    this.userService.updateUser(this.user?._id, this.user).subscribe((user: user) => {
      console.log('comment ', user)
      this.user = user
      //this.router.navigate(['/login']); 
    }, (error) => {
      // Manejar errores, por ejemplo, mostrar un mensaje de error.
      console.error('Error en el registro', error);
    });
  }
}
