import { Component, inject, input, signal } from '@angular/core';
import { Overlay } from '../overlay/overlay';
import { ShortnerApiRest } from '../../services/shortner-api-rest';

@Component({
  selector: 'app-content-card',
  imports: [
    Overlay
  ],
  templateUrl: './content-card.html',
  styleUrl: './content-card.css'
})

export class ContentCard {

  private shortnerServiceApiRest = inject(ShortnerApiRest);

  public readonly originalUrl = signal<string>("");

  public readonly clickCounter = input.required<number>();
  public readonly linkCounter = input.required<number>();

  public setOriginalUrl(setOriginalUrl: string): void {
    this.originalUrl.set(setOriginalUrl);
    this.shortnerServiceApiRest.createShortUrl(this.originalUrl()).subscribe({
      next: (response) => {
        console.log('Short URL created successfully', response.shortId);
      },
      error: (error) => {
        console.error('Error creating short URL', error);
      }
    });
  }

}
