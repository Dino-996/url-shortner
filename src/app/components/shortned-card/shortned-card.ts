import { Component } from '@angular/core';
import { bootstrapGraphUp, bootstrapSearch } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-shortned-card',
  imports: [
    NgIcon
  ],
  providers: [provideIcons({
    bootstrapSearch,
    bootstrapGraphUp
  })],
  templateUrl: './shortned-card.html',
  styleUrl: './shortned-card.css'
})

export class ShortnedCard {

}
