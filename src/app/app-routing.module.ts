import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { ArticleCreateComponent } from './pages/article-create/article-create.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './auth/auth.guard';
import { ChangesPasswordComponent } from './pages/changes-password/changes-password.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'detail/:id', component: ArticleDetailComponent},
  { path: 'createArticle', component: ArticleCreateComponent, canActivate: [ AuthGuard ] },
  { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ] },
  { path: 'changePassword', component: ChangesPasswordComponent, canActivate: [ AuthGuard ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
