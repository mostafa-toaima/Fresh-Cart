import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class BlankLayoutComponent {}
