import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { comment } from 'src/app/model/comment.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

   createComment(blogId: string, content: string): Observable<comment> {
    const newComment = { content };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<comment>(`${this.apiUrl}/api/comment/${blogId}`, newComment, {headers});
  }
}
