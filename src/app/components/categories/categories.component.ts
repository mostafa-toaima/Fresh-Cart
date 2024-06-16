import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { Categories } from '../../Core/interfaces/categories';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  constructor(private _ProductsService: ProductsService) { }
  categoriesData: Categories[]=[]

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._ProductsService.GetCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categoriesData = res.data;
      },
      error: (err) => { console.log(err);
      },
    })
  }
}
