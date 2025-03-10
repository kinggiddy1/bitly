import { Component } from '@angular/core';
import { TextInputComponent } from '../../../home/text-input/text-input/text-input.component';
import { ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-admin-home',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

  constructor(private authService: AuthService, private router: Router) {}

  private fb = new FormBuilder();

  limitForm = this.fb.group({
    long_url: ['', [Validators.required]],

  });

  newlimitForm() {
    this.authService.postUrls(this.limitForm.value).subscribe({
      next: (response) => {
        if (response) {
         
          this.router.navigateByUrl('/urls');
        } else {
          console.warn('Token is missing in response');
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
