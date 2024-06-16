import { WishlistService } from './../../Core/Services/wishlist.service';
import { CartService } from './../../Core/Services/cart.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  Renderer2,
} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent implements OnInit {
  constructor(
    private _Router: Router,
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}

  @ViewChild('navBar', { static: false }) navElement!: ElementRef;

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.navElement) {
      if (window.scrollY > 50) {
        this._Renderer2.addClass(this.navElement.nativeElement, 'px-5');
        this._Renderer2.addClass(this.navElement.nativeElement, 'shadow');
      } else {
        this._Renderer2.removeClass(this.navElement.nativeElement, 'px-5');
        this._Renderer2.removeClass(this.navElement.nativeElement, 'shadow');
      }
    }
  }

  cartNumOfItems: number = 0;
  whishItemNumber: number = 0;

  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartNumOfItems = data;
      },
    });

    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.cartNumOfItems = response.numOfCartItems;
      },
    });

    //wishList
    this._WishlistService.whishItemNumber.subscribe({
      next: (dataNum) => {
        this.whishItemNumber = dataNum;
      }
    })
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (dataNum) => {
        this.whishItemNumber = dataNum.count;
        console.log(this.whishItemNumber);

      }
    })

  }

  logOut() {
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
  }
}
