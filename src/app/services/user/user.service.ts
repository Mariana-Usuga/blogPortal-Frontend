import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { userLogin } from 'src/app/model/login.interface';
import { token } from 'src/app/model/token.interface';
import { user } from 'src/app/model/user.interface';
import { verifyPassword } from 'src/app/model/verifyPassword.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl;
  private valorCompartido = new BehaviorSubject<boolean>(true);
  private userName = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    this.valorCompartido.next(!!token);
    return !!token;
  }

  postUser(newUser: user): Observable<user> {
    console.log(this.apiUrl);
    return this.http.post<user>(`${this.apiUrl}/api/user`, newUser);
  }

  updateUser(id: string, newUser: user): Observable<user> {
    return this.http.put<user>(`${this.apiUrl}/api/user/${id}`, newUser);
  }

  updateUserPassword(id: string, newUser: user): Observable<user> {
    return this.http.put<user>(
      `${this.apiUrl}/api/user/password/${id}`,
      newUser,
    );
  }

  loginUser(user: userLogin): Observable<token> {
    console.log(this.apiUrl);
    return this.http.post<token>(`${this.apiUrl}/auth/local/login`, user);
  }

  verifyPassword(user: userLogin): Observable<verifyPassword> {
    return this.http.post<verifyPassword>(
      `${this.apiUrl}/auth/local/verify-password`,
      user,
    );
  }

  getUsername(): Observable<user> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get<user>(`${this.apiUrl}/api/user/me`, { headers });
  }

  logout() {
    localStorage.removeItem('token');
  }

  setName(valor: string) {
    this.userName.next(valor);
  }

  getName() {
    return this.userName.asObservable();
  }

  setValor(valor: boolean) {
    this.valorCompartido.next(valor);
  }

  getValor() {
    return this.valorCompartido.asObservable();
  }
}
