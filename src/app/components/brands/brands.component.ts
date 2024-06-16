import { BrandsService } from './../../Core/Services/brands.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Brands } from '../../Core/interfaces/brands';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  constructor(private _BrandsService: BrandsService) {}

  brandsData: Brands[] = [];
  currentPage: number = 1;
  pageSize: number = 0;
  total: number = 0;

  ngOnInit(): void {
    this.getBrands(this.currentPage);
  }

  getBrands(event: number) {
    this._BrandsService.getAllBrands(event).subscribe({
      next: (res: any) => {
        console.log(res);
        this.brandsData = res.data;
        this.currentPage = res.metadata.currentPage;
        this.pageSize = res.metadata.limit;
        this.total = res.results;
        console.log('brandsData ', res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  pageChanged(num: number): void {
    this.currentPage = num;
    this.getBrands(num);
  }
}
