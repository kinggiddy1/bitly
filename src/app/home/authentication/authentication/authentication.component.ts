import { CommonModule} from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TextInputComponent } from '../../text-input/text-input/text-input.component';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
// import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TextInputComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

  isLoginView : boolean = true;

  constructor(private AuthService: AuthService, private router: Router, ) {}

  private fb = new FormBuilder();

  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.minLength(3), Validators.required]],
  });

  registerUserForm() {
    this.AuthService.registerUser(this.registerForm.value).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.navigateBasedOnRole(response.token);
        } else {
          console.warn('Token is missing in response');
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.minLength(3), Validators.required]],
  });

  loginUserForm() {
    this.AuthService.loginUser(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.token) {
                  
          localStorage.setItem('token', response.token);
        
          this.navigateBasedOnRole(response.token);
          
        } 
        else {
          console.warn('Token is missing in response');
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private navigateBasedOnRole(token: any) {
    const decodedToken = jwtDecode(token) as any; 
    const userRole = decodedToken.role || 'User'; 
    if (userRole === 'Admin') {
      this.router.navigateByUrl('/dashboard');
    } else if (userRole === 'User') {
      this.router.navigateByUrl('/dashboard');
    } else {
      console.warn('Unknown role:', userRole);
    }
  }
  
}
