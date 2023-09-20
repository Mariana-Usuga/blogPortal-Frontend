import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { article } from '../model/article.inferces';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:8080/api/article'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getArticles(): Observable<article[]>{
    return this.http.get<article[]>(this.apiUrl);
  }

  getArticleById(id: any): Observable<article>{
    return this.http.get<article>(`${this.apiUrl}/${id}`);
  }

  postArticle(newArticle: any): Observable<article>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<article>(this.apiUrl, newArticle, {headers} );
  }
}
