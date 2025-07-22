import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { bootstrapBoxArrowUpRight, bootstrapCopy, bootstrapExclamationTriangle, bootstrapGraphUp, bootstrapSearch, bootstrapTrash, bootstrapXLg } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ShortnerApiRest } from '../../services/shortner-api-rest';
import { ShortUrl } from '../../services/shortner-api-rest';
import { DatePipe } from '@angular/common';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-shortned-card',
  imports: [
    NgIcon,
    DatePipe,
    NgbPopoverModule
  ],
  providers: [provideIcons({
    bootstrapSearch,
    bootstrapGraphUp,
    bootstrapExclamationTriangle,
    bootstrapXLg,
    bootstrapCopy,
    bootstrapBoxArrowUpRight,
    bootstrapTrash
  })],
  templateUrl: './shortned-card.html',
  styleUrl: './shortned-card.css'
})

export class ShortnedCard implements OnInit {

  private shortnerServiceApiRest = inject(ShortnerApiRest);

  public readonly allUrls = signal<ShortUrl[]>([]);
  public readonly shortedUrls = signal<ShortUrl[]>([]);
  public readonly searchTerm = signal<string>('');
  public readonly isSearch = signal<boolean>(false);
  public readonly copiedId = signal<string | null>(null);

  public readonly hasSearch = computed(() => this.searchTerm().trim().length > 0);

  public ngOnInit(): void {
    this.initUrls();
  }

  public initUrls(): void {
    this.shortnerServiceApiRest.getAllUrl().subscribe({
      next: (urls: ShortUrl[]) => {
        this.allUrls.set(urls);
        this.shortedUrls.set(urls);
      },
      error: (error) => {
        console.error("Errore nel recupero degli URL:", error);
        // fallback
        this.shortedUrls.set([]);
      }
    });
  }

  public onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  public search(): void {
    const term = this.searchTerm().trim().toLowerCase();
    const result = term ? this.allUrls().filter(
      url => url.shortId.toLowerCase().includes(term) ||
        url.originalUrl?.toLowerCase().includes(term)) : this.allUrls();
    this.shortedUrls.set(result);
    if (this.shortedUrls().length !== this.allUrls().length) {
      this.isSearch.set(true);
    }
  }

  public clearSearch(): void {
    this.searchTerm.set('');
    this.shortedUrls.set(this.allUrls());
    this.isSearch.set(false);
  }

  public async copyShortned(shortId: string): Promise<void> {
    try {
      const shortUrl = `https://as.up.railway.app/api/${shortId}`;
      this.copiedId.set(shortId);
      await navigator.clipboard.writeText(shortUrl);
      setTimeout(() => this.copiedId.set(null), 5000);
    } catch (error) {
      console.error("Errore nella copia:", error);
    }
  }

  public onShortenedLink(shortId: string): void {
    const shortUrl = `https://as.up.railway.app/api/${shortId}`;
    const redirect = window.location.href = shortUrl;
    window.open(redirect, '_blank');
  }

  public isCopied(shortId: string): boolean {
    return this.copiedId() === shortId;
  }

}