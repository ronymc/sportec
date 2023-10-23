import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchResultsComponent } from './match-results.component';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

describe('MatchResultsComponent', () => {
  let component: MatchResultsComponent;
  let fixture: ComponentFixture<MatchResultsComponent>;
  let matches = [
    {
      team1: 'Borussia Dortmund',
      team1_goal: '2',
      team2: 'FC Koln',
      team2_goal: '0',
      kickoff: '12:30',
      date: '2023-08-18',
      seasonId: 'SE_1',
      spieltagId: 'SPT_1',
    },
    {
      team1: 'FSV Mainz 05',
      team1_goal: '1',
      team2: 'TSG HoffenHeim',
      team2_goal: '2',
      kickoff: '17:30',
      date: '2023-08-20',
      seasonId: 'SE_1',
      spieltagId: 'SPT_1',
    },
    {
      team1: 'FC Bayern München',
      team1_goal: '3',
      team2: 'Eintracht Frankfurt',
      team2_goal: '1',
      kickoff: '11:30',
      date: '2023-08-18',
      seasonId: 'SE_1',
      spieltagId: 'SPT_1',
    },
  ];
  let matchDataView = new Map();

  matchDataView.set('2023-08-20', [matches[1]]);
  matchDataView.set('2023-08-18', [matches[0], matches[2]]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatchResultsComponent],
    }).overrideComponent(MatchResultsComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    });
    fixture = TestBed.createComponent(MatchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the matches given as input', () => {
    component.matchDataView = matchDataView;

    fixture.detectChanges();

    const matListItemElements = fixture.debugElement.queryAll(By.css('.match'));
    expect(matListItemElements.length).toBe(3);
  });
});
