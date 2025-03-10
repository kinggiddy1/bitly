import { Component } from '@angular/core';
import { TextInputComponent } from '../../../home/text-input/text-input/text-input.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creare-link',
  imports: [TextInputComponent, ReactiveFormsModule],
  templateUrl: './creare-link.component.html',
  styleUrl: './creare-link.component.css'
})
export class CreareLinkComponent {
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
