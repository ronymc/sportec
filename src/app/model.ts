interface MatSelectOption {
  value: string;
  displayName: string;
}

export interface Season extends MatSelectOption {}

export interface SpielTag extends MatSelectOption {}

export interface MatchData {
  team1: string;
  team2: string;
  team1_goal: string;
  team2_goal: string;
  kickoff: string;
  date: string;
  seasonId: string;
  spieltagId: string;
}

export interface MatchDataView {
  [key: string] : MatchData[];
}

export interface MatchListXML {
  matchList: {
    match: MatchData[]
  }
}