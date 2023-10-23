import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatchData } from 'src/app/model';

@Component({
  selector: 'app-match-results',
  templateUrl: './match-results.component.html',
  styleUrls: ['./match-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchResultsComponent {
  @Input() matchDataView:Map<string, MatchData[]> = new Map;

  // Workaround to maintain insertion order of Map keys in ngFor
  asIsOrder(a: any, b: any) {
    return 1;
  }
}
