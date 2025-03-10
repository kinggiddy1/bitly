import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-links',
  imports: [RouterLink],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css'
})
export class LinksComponent implements OnInit{
  links: any;

  constructor(private authService : AuthService){}

  ngOnInit(): void {
   this.getUrls();

}


getUrls() {
  this.authService.getUrls().subscribe({
    next: response => {
      this.links = response.map((link: any) => ({
        short_code: link.short_code,
        long_url: link.long_url,
        created_at: link.created_at,
        clicks: link.clicks
      }));
    },
    error: error => {
      console.log("Error fetching URLs:", error);
    }
  });
}

copyToClipboard(shortCode: string) {
  navigator.clipboard.writeText(shortCode).then(() => {
    alert('Short link copied');
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

}
