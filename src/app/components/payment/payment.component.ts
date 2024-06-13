import { CartService } from './../../Core/Services/cart.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
  ) {}

  cartId: string | null = '';

  orderForm: FormGroup = new FormGroup({
    details: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
  });

  handelOrderForm() {
    console.log(this.orderForm.value);
    this._CartService.checkOut(this.cartId, this.orderForm.value).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          console.log(res);
          window.open(res.session.url, '_self');
        }
      },
      error: () => {},
    });
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
      },
    });
  }


}
