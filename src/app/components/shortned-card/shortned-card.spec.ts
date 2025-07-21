import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortnedCard } from './shortned-card';

describe('ShortnedCard', () => {
  let component: ShortnedCard;
  let fixture: ComponentFixture<ShortnedCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortnedCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortnedCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
