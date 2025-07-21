import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-overlay',
  imports: [ReactiveFormsModule],
  templateUrl: './overlay.html',
  styleUrl: './overlay.css'
})

export class Overlay {

  protected readonly originalUrl = output<string>();

  public getOriginalUrl(): void {
    const shortnerUrl = this.shortnerForm.get('shonerUrl')?.value as string;
    this.originalUrl.emit(shortnerUrl);
  }

  public shortnerForm = new FormGroup({
    shonerUrl: new FormControl('', Validators.required),
  });

}
