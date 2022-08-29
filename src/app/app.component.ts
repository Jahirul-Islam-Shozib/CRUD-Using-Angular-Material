import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from './product.service';
import { ProductModel } from './product.model';
import { RouterLinkWithHref } from '@angular/router';
import { DataStorageService } from './data-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  productItems!: ProductModel[];
  displayedColumns: string[] = [
    'id',
    'productName',
    'category',
    'date',
    'freshness',
    'price',
    'comment',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title = 'angular-crud-mu';

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private dataStorageService: DataStorageService
  ) {}
  ngOnInit(): void {
    this.productItems = this.productService.getProductItems();
    this.productService.productItemChanged.subscribe(
      (productItems: ProductModel[]) => {
        this.productItems = productItems;
      }
    );
    this.onFetchData();
  }

  onEditItem(row: ProductModel) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row,
    });
  }
  onDelete(id: number) {
    this.productService.deleteProductItem(id);
    this.dataStorageService.storeData();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onFetchData() {
    this.dataStorageService.fetchData().subscribe();
  }
}
