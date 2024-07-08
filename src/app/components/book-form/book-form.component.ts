import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  isEditMode = false;
  bookId: string | null = null;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.isEditMode = true;
      this.http
        .get<any>(`${environment.apiUrl}/books/${this.bookId}`)
        .subscribe((data) => {
          this.bookForm.patchValue(data);
        });
    }
  }

  // getErrorMessage(controlName: string): string {
  //   const control = this.bookForm.get(controlName);
  //   if (!control) {
  //     return '';
  //   }

  //   if (control.hasError('required')) {
  //     return `${
  //       controlName.charAt(0).toUpperCase() + controlName.slice(1)
  //     } is required`;
  //   } else if (control.hasError('minlength')) {
  //     return `${
  //       controlName.charAt(0).toUpperCase() + controlName.slice(1)
  //     } must be at least 3 characters long`;
  //   }
  //   return '';
  // }

  get title() {
    return this.bookForm.get('title');
  }

  get author() {
    return this.bookForm.get('author');
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      if (this.isEditMode) {
        this.http
          .patch(
            `${environment.apiUrl}/books/${this.bookId}`,
            this.bookForm.value
          )
          .subscribe({
            next: (response: any) => {
              this.router.navigate(['/books']);
            },
            error: (error) => {
              this.errorMessage =
                'Something went wrong. Could not update the book!';
            },
          });
      } else {
        this.http
          .post(`${environment.apiUrl}/books`, this.bookForm.value)
          .subscribe({
            next: (response: any) => {
              this.router.navigate(['/books']);
            },
            error: (error) => {
              this.errorMessage =
                'Something went wrong. Could not add the book!';
            },
          });
      }
    } else {
      this.errorMessage = 'Please correct the errors and try again.';
    }
  }

  cancel(): void {
    this.router.navigate(['/books']);
  }
}
