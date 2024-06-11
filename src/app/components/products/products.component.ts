import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { Product } from '../../Core/interfaces/product';
import { CutTextPipe } from '../../Core/Pipes/cut-text.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CutTextPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(private _ProductsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
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
}
