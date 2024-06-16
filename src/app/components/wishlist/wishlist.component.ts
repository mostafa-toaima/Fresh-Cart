import { CutTextPipe } from './../../Core/Pipes/cut-text.pipe';
import { CartService } from './../../Core/Services/cart.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { WishlistService } from '../../Core/Services/wishlist.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../Core/interfaces/product';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, CutTextPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService: WishlistService,
    private _TostarService: ToastrService,
    private _Render2: Renderer2,
    private _CartService: CartService
  ) {}

  products: Product[] = [];
  isLoading: boolean = false;
  wishListData: string[] = [];

  ngOnInit(): void {
    this.getWishListUser();
  }

  getWishListUser() {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.products = res.data;
        this.wishListData = res.data.map((item: any) => item._id)
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

  removeFav(productId: string): void {
    this._WishlistService.removeItemFromWishList(productId).subscribe({
      next: (response) => {
        this._TostarService.success(response.message);
        this.wishListData = response.data;

        const newProductsData = this.products.filter((item) => this.wishListData.includes(item._id))
        this.products = newProductsData
        this._WishlistService.whishItemNumber.next(response.data.length);
      },
      error: (error) => {},
    });
  }
}
