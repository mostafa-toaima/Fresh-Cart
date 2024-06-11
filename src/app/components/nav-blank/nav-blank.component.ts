import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';


@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent implements OnInit {
  constructor(private _Router: Router) {}

  ngOnInit(): void {

  }

  signOut() {
    localStorage.removeItem('token');
    this._Router.navigate(['/login'])
  }
}
