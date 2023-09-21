import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { article } from '../../model/article.inferces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getArticles(): Observable<article[]> {
    return this.http.get<article[]>(`${this.apiUrl}/api/article`);
  }

  getArticleById(id: string): Observable<article> {
    console.log('id');
    return this.http.get<article>(`${this.apiUrl}/api/article/${id}`);
  }

  postArticle(newArticle: article): Observable<article> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<article>(`${this.apiUrl}/api/article`, newArticle, {
      headers,
    });
  }
}
