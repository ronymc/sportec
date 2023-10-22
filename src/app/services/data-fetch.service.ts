import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { parseStringPromise } from 'xml2js';
import { MatchData, MatchDataView } from '../model';

@Injectable({
  providedIn: 'root',
})
export class DataFetchService {
  private matchListUrl = 'assets/data.xml';
  private http = inject(HttpClient);

  getMatches(seasonId: string, spielTagId: string) {
    return this.http.get(this.matchListUrl, { responseType: 'text' }).pipe(
      switchMap((xmlfile: string) =>
        parseStringPromise(xmlfile, { explicitArray: false })
      ),
      map((data) =>
        data.matchList.match
          .filter(
            (m: MatchData) =>
              m.seasonId == seasonId && m.spieltagId == spielTagId
          )
          .sort(
            (m1: MatchData, m2: MatchData) =>
              new Date(m2.kickoff).getTime() - new Date(m1.kickoff).getTime()
          )
          .reduce((matchView: Map<string, MatchData[]>, match: MatchData) => {
            if (matchView.has(match.date)) {
              matchView.get(match.date)?.push(match);
            } else {
              matchView.set(match.date, [match]);
            }
            return matchView;
          }, new Map())
      )
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
