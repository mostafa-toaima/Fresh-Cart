import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../../Core/Services/cart.service';
import { CutTextPipe } from '../../Core/Pipes/cut-text.pipe';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CutTextPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartItems: any = null;

  constructor(
    private _CartService: CartService,
    private _Render2: Renderer2,
    private _TostarService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getLoggedUserCart();
  }

  getLoggedUserCart() {
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.cartItems = res.data;
        console.log(res);
      },
      error: (err) => {
        console.log();
      },
    });
  }

  updateItem(
    productId: string,
    countNumber: number,
    btn1: HTMLButtonElement,
    btn2: HTMLButtonElement
  ) {
    if (countNumber >= 1) {
      this._Render2.setAttribute(btn1, 'disabled', 'true');
      this._Render2.setAttribute(btn2, 'disabled', 'true');
      this._CartService.updateProductCount(productId, countNumber).subscribe({
        next: (response) => {
          console.log(response);
          this.cartItems = response.data;
          this._Render2.removeAttribute(btn1, 'disabled');
          this._Render2.removeAttribute(btn2, 'disabled');
        },
        error: (error) => {
          console.log(error);
          this._Render2.removeAttribute(btn1, 'disabled');
          this._Render2.removeAttribute(btn2, 'disabled');
        },
      });
    } else {
      this._CartService.removeSpecificItem(productId).subscribe((res) => {
        this.cartItems = res.data;
        this._TostarService.info("Item removed")
        this._CartService.cartNumber.next(res.numOfCartItems);
      });
    }
  }

  removeItem(productId: string, btnRef: HTMLButtonElement): void {
    this._Render2.setAttribute(btnRef, 'disabled', 'true');
    this._CartService.removeSpecificItem(productId).subscribe({
      next: (response) => {
        console.log(response);
        this.cartItems = response.data;
        this._Render2.removeAttribute(btnRef, 'disabled');
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: (error) => {
        console.log(error);
        this._Render2.removeAttribute(btnRef, 'disabled');
      },
    });
  }

  clearCart() {
    this._CartService.deleteCrt().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'success') {
          this.cartItems = null;
          this._TostarService.success('Cart is cleared successfully', 'Success')
        }
      },
      error:(err)=>{console.log(err);
      }
    })
  }
}
