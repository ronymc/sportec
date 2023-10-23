import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';
import { parseStringPromise } from 'xml2js';
import { MatchData, MatchListXML } from '../model';

@Injectable({
  providedIn: 'root',
})
export class DataFetchService {
  private matchDataUrl = 'assets/data.xml';
  private http = inject(HttpClient);

  getMatches(seasonId: string, spielTagId: string): Observable<MatchData[]> {
    return this.http.get(this.matchDataUrl, { responseType: 'text' }).pipe(
      switchMap((xmlfile: string) =>
        parseStringPromise(xmlfile, { explicitArray: false })
      ),
      map((data: MatchListXML) =>
        data.matchList.match.filter(
          (m: MatchData) => m.seasonId == seasonId && m.spieltagId == spielTagId
        )
      ),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
