import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header/header.component";
import { FooterComponent } from "../../footer/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.css'
})
export class DefaultLayoutComponent {

}
