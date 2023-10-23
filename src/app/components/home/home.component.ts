import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatchData, Season, SpielTag } from 'src/app/model';
import { DataFetchService } from 'src/app/services/data-fetch.service';
import { Observable, map, of, tap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatchResultsComponent } from '../match-results/match-results.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatchResultsComponent,
  ],
})
export class HomeComponent {
  seasons: Season[] = [
    { value: 'SE_1', displayName: '2023-2024' },
    { value: 'SE_2', displayName: '2022-2023' },
    { value: 'SE_3', displayName: '2021-2022' },
  ];

  spielTags: SpielTag[] = [
    { value: 'SPT_1', displayName: 'Spieltag 1' },
    { value: 'SPT_2', displayName: 'Spieltag 2' },
    { value: 'SPT_3', displayName: 'Spieltag 3' },
  ];

  $matchDataView: Observable<Map<string, MatchData[]>> = of<
    Map<string, MatchData[]>
  >(new Map());
  formBuilder = inject(FormBuilder);
  dataFetchService = inject(DataFetchService);

  matchSearchform = this.formBuilder.group({
    seasonId: ['', Validators.required],
    spieltagId: ['', Validators.required],
  });

  searchMatches(): void {
    let { seasonId, spieltagId } = this.matchSearchform.value;
    if (seasonId && spieltagId) {
      this.$matchDataView = this.dataFetchService
        .getMatches(seasonId, spieltagId)
        .pipe(
          map((matches: MatchData[]) =>
            matches
              // sort matches based on kickoff date and time
              .sort(
                (m1: MatchData, m2: MatchData) =>
                  new Date(m2.kickoff).getTime() -
                  new Date(m1.kickoff).getTime()
              )
              // convert kickoff time to readable format
              .map((m: MatchData) => {
                let kickoff = new Date(m.kickoff);
                m.kickoff = `${kickoff.getHours()}:${kickoff.getMinutes()}`;
                return m;
              })
              // Grouping the matches by date
              .reduce(
                (matchView: Map<string, MatchData[]>, match: MatchData) => {
                  if (matchView.has(match.date)) {
                    matchView.get(match.date)?.push(match);
                  } else {
                    matchView.set(match.date, [match]);
                  }
                  return matchView;
                },
                new Map()
              )
          )
        );
    }
  }
}
