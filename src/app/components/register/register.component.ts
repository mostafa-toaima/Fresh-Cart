import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../Core/Services/auth.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading: boolean = false;
  errMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private _Router: Router,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group(
      {
        name: ["", [Validators.required, Validators.minLength(3)]],
        email: ["", [Validators.required, Validators.email]],
        password: [
          "",
          [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,8}$/)],
        ],
        rePassword: [""],
        phone: [
          "",
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
      },
      { validators: [this.checkPassword] }
    );
  }

  checkPassword(group: FormGroup): void {
    const password = group.get("password");
    const rePassword = group.get("rePassword");
    if (rePassword?.value == "") {
      rePassword?.setErrors({ required: true });
    } else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ mismatch: true });
    }
  }

  registerHandel(registerForm: FormGroup) {
    this.isLoading = true;
    if (registerForm.valid) {
      this._AuthService.SignUp(registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this._Router.navigate(["/home"]);
          this.isLoading = false;
          localStorage.setItem('token', res.token);
          this._AuthService.decodedToken();
        },
        error: (error) => {
          this.errMsg = error.error.message;
          console.log(error);
          this.isLoading = false;
        },
      });
    }
    registerForm.reset();
  }
}
