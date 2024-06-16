import { ProductsService } from './../../Core/Services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Categories } from '../../Core/interfaces/categories';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoreydetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoreydetails.component.html',
  styleUrl: './categoreydetails.component.scss',
})
export class CategoreydetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService
  ) {}

  catId: string | null = '';


// way
  // categoryDetails: Categories ={
  //   image: '',
  //   name: ''
  // }
  
  categoryDetails: Categories = {} as Categories;
//end

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.catId = params.get('id');
      },
    });

    this.getData();
  }

  getData(): void {
    this._ProductsService.GetCategoryDetails(this.catId).subscribe({
      next: (res) => {
        console.log(res);
        this.categoryDetails = res.data;
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
