import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { comment } from 'src/app/model/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/api/comment';

  constructor(private http: HttpClient) { }

   createComment(blogId: string, content: string): Observable<comment> {
    const newComment = { content };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<comment>(`${this.apiUrl}/${blogId}`, newComment, {headers});
  }
}
