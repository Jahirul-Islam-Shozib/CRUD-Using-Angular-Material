import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductModel } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productItemChanged = new Subject<ProductModel[]>();

  constructor() {}

  productItems: ProductModel[] = [
    // new ProductModel(
    //   1,
    //   'Mobile',
    //   'Electronics',
    //   8 / 2 / 2022,
    //   'Brand New',
    //   23000,
    //   'this is a new phone'
    // ),
    // new ProductModel(
    //   2,
    //   'Camera',
    //   'Electronics',
    //   18 / 2 / 2022,
    //   'Brand New',
    //   28000,
    //   'this is a new Camera'
    // ),
  ];

  getProductItems() {
    return this.productItems.slice();
  }

  setProductItems(getData: ProductModel[]) {
    //this.productItems = getData;
    if (getData && getData.length >= 1) {
      this.productItems = getData;
    } else {
      console.log(alert('No Data Found'));
    }
    this.productItemChanged.next(this.productItems.slice());
  }

  addProductItem(productItem: ProductModel) {
    this.productItems.push(productItem);
    this.productItemChanged.next(this.productItems.slice());
  }
  updateProductItem(id: number, updateItem: ProductModel) {
    const updateIndex = this.productItems.findIndex(
      (checkItem: ProductModel) => {
        return checkItem.id === id;
      }
    );
    this.productItems[updateIndex] = updateItem;
    this.productItemChanged.next(this.productItems.slice());
  }
  deleteProductItem(id: number) {
    const index = this.productItems.findIndex((checkItem: ProductModel) => {
      return checkItem.id === id;
    });
    this.productItems.splice(index, 1);
    this.productItemChanged.next(this.productItems.slice());
  }
}
