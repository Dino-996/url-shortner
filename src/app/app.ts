import { Component, inject, OnInit, signal } from '@angular/core';
import { ShortnerApiRest } from './services/shortner-api-rest';
import { ContentCard } from './components/content-card/content-card';
import { ShortnedCard } from './components/shortned-card/shortned-card';
import { ShortUrl } from './services/shortner-api-rest';

@Component({
  selector: 'app-root',
  imports: [
    ContentCard,
    ShortnedCard
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {

  private shortnerServiceApiRest = inject(ShortnerApiRest);

  public readonly urlsCount = signal<number>(0);
  public readonly clickCount = signal<number>(0); // bisogna creare un api ad-hoc per il click count

  public ngOnInit(): void {
    this.getUrlsCount();
  }

  

  public getClickCounter(): void {
    this.shortnerServiceApiRest.getAllUrl().subscribe((urls: ShortUrl[]) => {
      let counter = 0;
      urls.forEach(url => {
        counter += url.visitCount;
      });
      console.debug('Counter:', counter, this.clickCount());
      this.clickCount.set(counter);
    });
  }

  public getUrlsCount(): void {
    this.shortnerServiceApiRest.getAllUrl().subscribe((urls: ShortUrl[]) => {
      console.debug('urls:', urls.length);
      this.urlsCount.set(urls.length);
    });
  }

}
