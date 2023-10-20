import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Season, SpielTag } from 'src/app/model';
import { DataFetchService } from 'src/app/services/data-fetch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  seasons: Season[] = [
    { value: 'SE_1', displayName: '2023-2024' },
    { value: 'SE_2', displayName: '2022-2023' },
    { value: 'SE_3', displayName: '2021-2022' },
  ];

  spielTags: SpielTag[] = [
    { value: 'SPT_1', displayName: 'SpielTag 1' },
    { value: 'SPT_2', displayName: 'SpielTag 2' },
    { value: 'SPT_3', displayName: 'SpielTag 3' },
    { value: 'SPT_4', displayName: 'SpielTag 4' },
    { value: 'SPT_5', displayName: 'SpielTag 5' },
  ];

  formBuilder = inject(FormBuilder);
  dataFetchService = inject(DataFetchService);

  matchSearchform = this.formBuilder.group({
    season: ['', Validators.required],
    spielTag: ['', Validators.required],
  });

  searchFixtures(): void {
    let {season, spielTag} = this.matchSearchform.value;
    if(season && spielTag) {
      this.dataFetchService.getMatches(season, spielTag).subscribe(data => {
        console.log(data);
      });
    }
  }
}
