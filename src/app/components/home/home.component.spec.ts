import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { DataFetchService } from 'src/app/services/data-fetch.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockDataFetchService: any;

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

  beforeEach(() => {
    mockDataFetchService = jasmine.createSpyObj(['getMatches']);
    TestBed.configureTestingModule({
      imports: [HomeComponent, BrowserAnimationsModule],
      providers: [
        { provide: DataFetchService, useValue: mockDataFetchService },
      ],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('searchMatches function should convert data to correct format', () => {
    mockDataFetchService.getMatches.and.returnValue(of(matches));
    component.matchSearchform.setValue({
      seasonId: 'SE_1',
      spieltagId: 'SPT_1',
    });

    component.searchMatches();

    let expectedMatchDataView = new Map();
    expectedMatchDataView.set('2023-08-20', [matches[1]]);
    expectedMatchDataView.set('2023-08-18', [matches[0], matches[2]]);
    component.$matchDataView.subscribe((matchDataView) =>
      expect(matchDataView).toEqual(expectedMatchDataView)
    );
  });
});
