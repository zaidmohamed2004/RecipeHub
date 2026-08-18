import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {

  @Input() title = '';

  @Input() category = '';

  @Input() description = '';

  @Input() price = 0;

  @Input() image = '';

}
