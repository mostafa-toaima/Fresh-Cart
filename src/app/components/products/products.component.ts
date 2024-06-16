import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { Product } from '../../Core/interfaces/product';
import { CutTextPipe } from '../../Core/Pipes/cut-text.pipe';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../Core/Services/cart.service';
import { WishlistService } from '../../Core/Services/wishlist.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CutTextPipe, RouterLink, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: Product[] = [];
  pageSize: number = 0;
  currentPage: number = 1;
  total: number = 0;
  isLoading: boolean = false;
  wishListData: string[] = [];

  constructor(
    private _ProductsService: ProductsService,
    private _Render2: Renderer2,
    private _TostarService: ToastrService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.getProducts(this.currentPage);
    this.getWishListUser();
  }

  getWishListUser() {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishListData = res.data.map((item: any) => item._id);
      },
    });
  }

  getProducts(event: number) {
    this._ProductsService.GetAllProducts(event).subscribe({
      next: (res) => {
        console.log('products ', res);
        this.products = res.data;
        this.pageSize = res.metadata.limit;
        this.currentPage = res.metadata.currentPage;
        this.total = res.results;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  pageChanged(event: any): void {
    console.log(event);
    this.currentPage = event;
    this.getProducts(event);
  }

  addToCart(id: any, element: HTMLButtonElement) {
    this._Render2.setAttribute(element, 'disabled', 'true');
    this.isLoading = true;
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this._TostarService.success(res.message);
        this._Render2.removeAttribute(element, 'disabled');

        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
        this._TostarService.error(err.message);
        this.isLoading = false;
        this._Render2.removeAttribute(element, 'disabled');
      },
    });
  }

  addFav(productId: string): void {
    this._WishlistService.addItemToWishList(productId).subscribe({
      next: (response) => {
        console.log(response);
        this._TostarService.success(response.message);
        this.wishListData = response.data;
        this._WishlistService.whishItemNumber.next(response.data.length);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  removeFav(productId: string): void {
    this._WishlistService.removeItemFromWishList(productId).subscribe({
      next: (response) => {
        this._TostarService.success(response.message);
        this.wishListData = response.data;
        this._WishlistService.whishItemNumber.next(response.data.length);
      },
      error: (error) => {},
    });
  }
}
