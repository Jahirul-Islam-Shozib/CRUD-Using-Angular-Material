import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from '../product.model';
import { ProductService } from '../product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  freshNessList = ['Brand  New', 'Second Hand', 'Refurbished'];
  editMode = false;
  editedItemIndex!: number;
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private dataStorageService: DataStorageService,
    @Inject(MAT_DIALOG_DATA) public editItem: ProductModel,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.editItem) {
      this.editMode = true;

      this.editForm(this.editItem);
    } else {
      this.initForm();
    }
    // if (this.editItem) {
    //   this.productForm.controls['productName'].setValue(
    //     this.editItem.productName
    //   );
    //   this.productForm.controls['category'].setValue(this.editItem.category);
    //   this.productForm.controls['date'].setValue(this.editItem.date);
    //   this.productForm.controls['freshness'].setValue(this.editItem.freshness);
    //   this.productForm.controls['price'].setValue(this.editItem.price);
    //   this.productForm.controls['comment'].setValue(this.editItem.comment);
    // } else {
    //   this.initForm();
    // }
  }

  private initForm() {
    this.productForm = this.formBuilder.group({
      id: ['', Validators.required],
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
    });

    //console.log(this.editItem);
    // this.productForm = this.formBuilder.group({
    //   productName: item ? [item.productName, Validators.required] : ['', Validators.required],
    //   category:item ? [item.category, Validators.required] : ['', Validators.required],
    //   date:item ? [item.date, Validators.required] : ['', Validators.required],
    //   freshness: item ? [item.freshness, Validators.required] : ['', Validators.required],
    //   price: item ? [item.price, Validators.required] : ['', Validators.required],
    //   comment:item ? [item.comment, Validators.required] : ['', Validators.required],
    // });
  }

  private editForm(item: ProductModel) {
    this.productForm = this.formBuilder.group({
      id: [item.id, Validators.required],
      productName: [item.productName, Validators.required],
      category: [item.category, Validators.required],
      date: [item.date, Validators.required],
      freshness: [item.freshness, Validators.required],
      price: [item.price, Validators.required],
      comment: [item.comment, Validators.required],
    });
  }

  onAddProduct() {
    if (this.editMode) {
      this.productService.updateProductItem(
        this.editItem.id,
        this.productForm.value
      );
    } else {
      this.productService.addProductItem(this.productForm.value);
    }
    this.editMode = false;
    this.productForm.reset();
    this.dataStorageService.storeData();
  }
}
