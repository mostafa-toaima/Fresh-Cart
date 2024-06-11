import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Core/Services/cart.service';
import { CutTextPipe } from '../../Core/Pipes/cut-text.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CutTextPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {

  cartItems: any = null;

  constructor(private _CartService: CartService) {}

  ngOnInit(): void {
    this.getLoggedUserCart();
  }

  getLoggedUserCart() {
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.cartItems = res.data
        console.log(res);
      },
      error: (err) => {
        console.log();
      },
    });
  }
}
