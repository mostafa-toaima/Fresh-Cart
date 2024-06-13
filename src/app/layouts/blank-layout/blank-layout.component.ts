import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2, ViewChild, viewChild } from '@angular/core';
import { NavBlankComponent } from '../../components/nav-blank/nav-blank.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule, NavBlankComponent, RouterModule, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss',
})
export class BlankLayoutComponent {
  constructor(private _Renderer2: Renderer2) {}

  goToUp() {
    scrollTo(0, 0);
  }

  @ViewChild('btnUp') btnUp!: ElementRef;

  @HostListener('window:scroll')
  onScroll(): void {
    if (scrollY >= 200) {
      this._Renderer2.removeClass(this.btnUp.nativeElement, 'display');
    } else {
      this._Renderer2.addClass(this.btnUp.nativeElement, 'display');
    }
  }
}
