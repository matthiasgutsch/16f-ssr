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
  pageSize;
  page = 1;
  
  constructor(private service: BookStoreService) {

    const params = this.getRequestParams(
      this.nameFilter,
      this.typeFilter,
      this.orderBy = 'desc',
      this.orderByType = 'startup_id',
      this.page,
      this.pageSize = 6,
    );
    
    
    this.books$ = this.service.getAll(params);
  }


  getRequestParams(
    searchTitle: string, 
    typeTitle: string,
    orderBy: string,
    orderByType: string,
    page: number, 
    pageSize: string | number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};
    let adder = '?';
    if (page) {
      params[`page`] = page - 1;
      adder + 'page=' + (page - 1);
      adder = '&';
    }
    if (searchTitle) {
      params[`name`] = searchTitle;
      adder + 'name=' + searchTitle;
      adder = '&';
    }

    if (typeTitle) {
      params[`type`] = typeTitle;
      adder + 'type=' + typeTitle;
      adder = '&';
    }

    
    if (orderBy) {
      params[`orderBy`] = orderBy;
      adder + 'orderBy=' + orderBy;
    }

    if (orderByType) {
      params[`orderByType`] = orderByType;
      adder + 'orderByType=' + orderByType;
    }

    if (pageSize) {
      params[`size`] = pageSize;
      adder + 'size=' + pageSize;
    }

    return params;

  }

}
