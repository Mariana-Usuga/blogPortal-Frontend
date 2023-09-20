import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/api/comment';

  constructor(private http: HttpClient) { }

   createComment(blogId: string, content: string): Observable<Comment> {
    const newComment = { content };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmlhbmEyQGdtYWlsLmNvbSIsIm5hbWUiOiJtYXJpYW5hMiIsIl9pZCI6IjY1MDhlNWFjMTkyNzJmZjVhMGQ4NDE4MSIsImlhdCI6MTY5NTEzNDU4OSwiZXhwIjoxNjk1MTQ1Mzg5fQ.sxEAPRNs4toDRoehu3T0pavD5sSke8AR9R0d_DNSxqc`
    });

    return this.http.post<Comment>(`${this.apiUrl}/${blogId}`, newComment, {headers});
  }
}
