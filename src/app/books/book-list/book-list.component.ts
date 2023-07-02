import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Book } from '../../shared/book';
import { BookStoreService } from '../../shared/book-store.service';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  books$: Observable<Book[]>;
  nameFilter: string;
  categories: any = [];
  descriptionFilter: string;
  codeFilter: string;
  codeIntFilter: string;
  categoryFilter: any;
  brandFilter: string;
  orderBy: string;
  orderByType: string;
  typeFilter: any;
  page = 1;

  constructor(private service: BookStoreService) {

    const params = {
      nameFilter: '',
      typeFilter: '',
      orderBy: 'desc',
      orderByType: 'startup_id',
      size: 6,
      page: 0
    }

    this.books$ = this.service.getAll(params);
  }


}
