import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatchData, MatchDataView } from 'src/app/model';

@Component({
  selector: 'app-match-results',
  templateUrl: './match-results.component.html',
  styleUrls: ['./match-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchResultsComponent {
  @Input() matches:Map<string, MatchData[]> = new Map;

  asIsOrder(a: any, b: any) {
    return 1;
  }
}
