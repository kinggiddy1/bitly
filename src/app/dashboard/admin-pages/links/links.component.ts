import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-links',
  imports: [],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css'
})
export class LinksComponent implements OnInit{
  links: any;

  constructor(private authService : AuthService){}

  ngOnInit(): void {
    this.authService.getUrls().subscribe({
      next: (data) => {
        // this.links = data['limitAmount']['limit_amount'];
        console.log(data)
      },

      error: (error) => {
        console.error('Error fetching links', error);
      }
    })


}

}
