import { AuthService } from './../../Core/Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss',
})
export class UpdatePasswordComponent implements OnInit {
  constructor(
    private _Render2: Renderer2,
    private _Router: Router,
    private _AuthService: AuthService
  ) {}
  isLoading: boolean = false;
  name: string = '';
  userData: any ={}

  ngOnInit(): void {
    this._AuthService.decodedToken();
    this.userData = this._AuthService.userInfo
        this.name = this.userData?.name;

    console.log(this.userData);

  }


  updateForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
  });

  handelUpdate(updateForm: FormGroup, btnUpdate: HTMLButtonElement) {
    this._Render2.setAttribute(btnUpdate, 'disabled', 'true');
    this.isLoading = true;
    if (updateForm.valid) {
      this._AuthService.updatePassword(updateForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this._Router.navigate(['/home']);
          localStorage.setItem('token', res.token);
          this._AuthService.decodedToken();
          this.isLoading = false;
          this._Render2.removeAttribute(btnUpdate, 'disabled');
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
          this._Render2.removeAttribute(btnUpdate, 'disabled');
        },
      });
    }
    updateForm.reset();
  }
}
