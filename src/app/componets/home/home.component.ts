import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

interface League {
  value: string;
  displayName: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  leagues: League[] = [
    { value: 'll', displayName: 'La Liga' },
    { value: 'bl', displayName: 'Bundesliga' },
    { value: 'pl', displayName: 'Premire League' },
  ];

  formBuilder = inject(FormBuilder);

  matchSearchform = this.formBuilder.group({
    league: ['', Validators.required],
    date: [new Date(), Validators.required],
  });
}
