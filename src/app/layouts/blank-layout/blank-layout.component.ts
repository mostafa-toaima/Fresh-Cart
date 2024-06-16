import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
  viewChild,
} from '@angular/core';
import { NavBlankComponent } from '../../components/nav-blank/nav-blank.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavBlankComponent,
    FooterComponent,
    NgxSpinnerModule,
  ],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss',
})
export class BlankLayoutComponent {
  constructor(private _Renderer2: Renderer2) {}

  @ViewChild('goUp', { static: false }) goUp!: ElementRef;

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.goUp) {
      if (window.scrollY > 300) {
        this._Renderer2.removeClass(this.goUp.nativeElement, 'hide');
      } else {
        this._Renderer2.addClass(this.goUp.nativeElement, 'hide');
      }
    }
  }
  goToUp(): void {
    scrollTo(0, 0);
  }
}
