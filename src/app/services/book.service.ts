import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getBook(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createBook(title: string, author: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { title, author });
  }

  updateBook(id: string, title: string, author: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${id}`, { title, author });
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
