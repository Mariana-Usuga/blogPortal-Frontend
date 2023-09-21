import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { userLogin } from 'src/app/model/login.interface';
import { user } from 'src/app/model/user.interface';
import { environment } from 'src/enviroments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //private apiUrl = 'http://localhost:8080/api/user';
  apiUrl = environment.apiUrl; // Utiliza environment.apiUrl
  private valorCompartido = new BehaviorSubject<boolean>(true);
  private userName = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    this.valorCompartido.next(!!token);
    return !!token;
  }

  postUser(newUser: user): Observable<user>{
    return this.http.post<user>(`${this.apiUrl}/api/user`, newUser);
  }

  updateUser(id: any, newUser: user): Observable<user>{
    return this.http.patch<user>(`${this.apiUrl}/api/user/${id}`, newUser);
  }

  updateUserPassword(id: any, newUser: user): Observable<user>{
    return this.http.patch<user>(`${this.apiUrl}/api/user/password/${id}`, newUser);
  }

  loginUser(user: userLogin): any{
    return this.http.post<any>(`${this.apiUrl}/auth/local/login`, user);
  }
  
  verifyPassword(user: any): any{
    return this.http.post<any>(`${this.apiUrl}/auth/local/verify-password`, user);
  }

  getUsername(): Observable<user>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    
    return this.http.get<user>(`${this.apiUrl}/api/user/me`, {headers} );
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
