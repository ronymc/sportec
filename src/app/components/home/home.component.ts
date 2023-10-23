import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatchData, Season, SpielTag } from 'src/app/model';
import { DataFetchService } from 'src/app/services/data-fetch.service';
import { Observable, map, of } from 'rxjs';

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
