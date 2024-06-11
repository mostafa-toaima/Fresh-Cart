import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'randomSlice',
  standalone: true,
})

export class RandomSlicePipe implements PipeTransform {
  transform(products: any[]): Product[] {
    const result: any[] = [];
    const indices = new Set<number>();

    while (indices.size < 18 && indices.size < products.length) {
      indices.add(this.getRandomNumber(0, products.length - 1));
    }

    indices.forEach((index) => result.push(products[index]));
    return result;
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
