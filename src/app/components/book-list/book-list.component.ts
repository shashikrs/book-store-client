import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TruncatePipe } from '../../pipes/text-truncate.pipe';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    TruncatePipe,
    MatTooltip,
  ],
})
export class BookListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'author', 'action'];
  dataSource = new MatTableDataSource<any>();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    this.http.get<any[]>(`${environment.apiUrl}/books`).subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  editBook(id: string) {
    this.router.navigate(['/books', id]); // Navigate to edit page with book id
  }

  deleteBook(id: string) {
    this.http.delete(`${environment.apiUrl}/books/${id}`).subscribe(() => {
      this.fetchBooks();
    });
  }

  addBook() {
    this.router.navigate(['/books/new']);
  }

  isDisabled(e: string) {
    return e.length <= 50;
  }
}
