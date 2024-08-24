import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login, LoginResponse } from 'src/app/cores/interface/auth.interface';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMsg!: string;

  constructor(private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }
  ngOnInit(): void {
    this.initForm();

    this._authService.isAuthenticated$.subscribe((value) => {
      console.log(value);
    })

  }

  initForm() {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      console.log(this.loginForm);

      return;
    }
    const loginData = this.loginForm.value;

    this._authService.login(loginData).subscribe({
      next: (response: LoginResponse) => {
        this._authService.setAuthData(response);
        this._authService.isAuthenticated$.next(true);

        this._router.navigate(['/products-list']);
      },
      error: (error) => {
        this.errorMsg = error.error.message;
      }
    });
  }

}
