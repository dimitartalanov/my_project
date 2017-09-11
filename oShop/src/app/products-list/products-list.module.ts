import { ProductService } from './../product/services/product.service';
import { ProductsListRoutingModule } from './products-list-routing.module';
import { ProductsListComponent } from './products-list.component';
import { ProductsListService } from './services/products-list.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    ProductsListRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ProductsListComponent],
  providers: [
    ProductsListService,
    ProductService
  ]
})
export class ProductsListModule { }
