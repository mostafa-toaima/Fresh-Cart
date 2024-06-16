import { WishlistService } from './../../Core/Services/wishlist.service';
import { CartService } from './../../Core/Services/cart.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { CutTextPipe } from '../../Core/Pipes/cut-text.pipe';
import { Product } from '../../Core/interfaces/product';
import { RandomSlicePipe } from '../../Core/Pipes/random.pipe';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Categories } from '../../Core/interfaces/categories';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../Core/Pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CutTextPipe,
    RandomSlicePipe,
    CarouselModule,
    RouterLink,
    SearchPipe,
    FormsModule,
    NgbModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Categories[] = [];
  isLoading: boolean = false;
  term: string = '';
  wishListData: string[] = [];

  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _TostarService: ToastrService,
    private _Render2: Renderer2,
    private _WishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.getPopularProducts();
    this.getCategories();
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

  getPopularProducts() {
    this._ProductsService.GetAllProducts().subscribe({
      next: (res) => {

        this.products = res.data;
        console.log('productsData ',this.products);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getCategories() {
    this._ProductsService.GetCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categories = res.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
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
      error: (error) => {
        console.log(error);
      },
    });
  }

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };

  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
    },
  };
}
