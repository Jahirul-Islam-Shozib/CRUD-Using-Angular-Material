import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  storeData() {
    const empData = this.productService.getProductItems();
    this.http
      .put(
        'https://angular-material-crud-cf079-default-rtdb.firebaseio.com/empData.json',
        empData
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchData() {
    return this.http
      .get<ProductModel[]>(
        'https://angular-material-crud-cf079-default-rtdb.firebaseio.com/empData.json'
      )
      .pipe(
        tap((empData) => {
          this.productService.setProductItems(empData);
        })
      );
  }
}
