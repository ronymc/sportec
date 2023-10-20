import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { parseStringPromise } from 'xml2js';
import { MatchData } from '../model';

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
        data.matchList.match.filter(
          (m: MatchData) => m.seasonId == seasonId && m.spieltagId == spielTagId
        )
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
