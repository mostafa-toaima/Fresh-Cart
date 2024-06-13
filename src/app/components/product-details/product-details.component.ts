import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../Core/Services/products.service';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../Core/Services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  productDetails: any = [];
  productId!: any;
  isLoading: boolean = false;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _TostarService: ToastrService,
    private _Render2: Renderer2
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
        if (this.productId) {
          this.getProductDetails();
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getProductDetails() {
    this._ProductsService.GetSpecificProduct(this.productId).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      },
      error: (err) => {
        console.log(err);
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

  productDetailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    items: 1,
  };
}
