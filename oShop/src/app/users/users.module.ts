import { ProductService } from './../product/services/product.service';
import { UsersRoutingModule } from './users-routing.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  SignInFormComponent,
  SignUpFormComponent,
  ShoppingCartComponent
} from './components';

// import { AuthGuard } from '../shared/guards/authGuard';

@NgModule({
  imports: [
    UsersRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    //  AuthGuard
  ],
  declarations: [
    SignInFormComponent,
    SignUpFormComponent,
    ShoppingCartComponent
  ],
  providers: [ProductService],
})
export class UsersModule { }
