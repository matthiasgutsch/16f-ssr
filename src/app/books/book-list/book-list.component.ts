import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Book } from '../../shared/book';
import { BookStoreService } from '../../shared/book-store.service';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];
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

  }


  ngOnInit(): void {
    this.service.getAll({page: 0, size: 3, orderBy: 'random', orderByType: 'page_id'}).subscribe((pData) => {
      this.books = pData;
    });  
  }

}
