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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CutTextPipe,
    RandomSlicePipe,
    CarouselModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Categories[] = [];
  isLoading: boolean = false;

  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _TostarService: ToastrService,
    private _Render2: Renderer2
  ) {}

  ngOnInit(): void {
    this.getPopularProducts();
    this.getCategories();
  }

  getPopularProducts() {
    this._ProductsService.GetAllProducts().subscribe({
      next: (res) => {
        console.log(res);

        this.products = res.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getCategories() {
    this._ProductsService.GetPopularCategories().subscribe({
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

    this._Render2.setAttribute(element, 'disabled', 'true')



    this.isLoading = true;
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this._TostarService.success(res.message);
    this._Render2.removeAttribute(element, 'disabled');
      },
      error: (err) => {
        console.log(err);
        this._TostarService.error(err.message);
        this.isLoading = false;
        this._Render2.removeAttribute(element, 'disabled');
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
    items: 1,
  };
}
