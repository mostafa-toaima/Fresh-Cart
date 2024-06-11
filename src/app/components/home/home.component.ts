import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { CutTextPipe } from '../../Core/Pipes/cut-text.pipe';
import { Product } from '../../Core/interfaces/product';
import { RandomSlicePipe } from '../../Core/Pipes/random.pipe';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Categories } from '../../Core/interfaces/categories';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CutTextPipe, RandomSlicePipe, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Categories[] = [];

  constructor(private _ProductsService: ProductsService) {}

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
