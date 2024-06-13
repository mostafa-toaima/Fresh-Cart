import { ForgetpassService } from './../../Core/Services/forgetpass.service';
import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
  constructor(
    private _ForgetpassService: ForgetpassService,
    private _Renderer2: Renderer2,
    private _Router: Router
  ) {}

  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  isLoading: boolean = false;
  email: string = '';
  userMsg: string = '';

  forgotForm: FormGroup = new FormGroup({
    email: new FormControl(''),
  });

  resetCode: FormGroup = new FormGroup({
    resetCode: new FormControl(''),
  });

  resetPassword: FormGroup = new FormGroup({
    newPassword: new FormControl(''),
  });

  forgotPassword(btn: HTMLButtonElement): void {
    this.isLoading = true;
    this._Renderer2.setAttribute(btn, 'disabled', 'true');
    let userMsgEmail = this.forgotForm.value;
    this.email = userMsgEmail.email;
    this._ForgetpassService.forgetPassword(userMsgEmail).subscribe({
      next: (response) => {
        this.userMsg = response.message;
        this.isLoading = false;
        this._Renderer2.setAttribute(btn, 'disabled', 'true');
        (this.step1 = false), (this.step2 = true);
      },
      error: (error) => {
        this.userMsg = error.error.message;
        this.isLoading = false;
        this._Renderer2.removeAttribute(btn, 'disabled');
      },
    });
  }

  resetPasswordCode(btn: HTMLButtonElement): void {
    this._Renderer2.setAttribute(btn, 'disabled', 'true');
    this.isLoading = true;
    let resetCode = this.resetCode.value;
    this._ForgetpassService.verifyResetCode(resetCode).subscribe({
      next: (response) => {
        (this.step2 = false), (this.step3 = true);
        this.userMsg = response.message;
        this._Renderer2.removeAttribute(btn, 'disabled');
        this.isLoading = false;
      },
      error: (error) => {
        this.userMsg = error.error.message;
        this._Renderer2.removeAttribute(btn, 'disabled');
        this.isLoading = false;
      },
    });
  }

  newPassword(btn: HTMLButtonElement): void {
    this._Renderer2.setAttribute(btn, 'disabled', 'true');
    this.isLoading = true;
    let resetDataForm = this.resetPassword.value;
    resetDataForm.email = this.email;

    this._ForgetpassService.resetPassword(resetDataForm).subscribe({
      next: (response) => {
        console.log(response);
        this._Renderer2.removeAttribute(btn, 'disabled');
        this.isLoading = false;
        this.isLoading = false;
        if (response.token) {
          localStorage.setItem('token', response.token);
          this._Router.navigate(['/home'])
        }
      },
      error: (error) => {
        this.userMsg = error.error.message;
        this.isLoading = false;
      },
    });
  }
}
