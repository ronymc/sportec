interface MatSelectOption {
  value: string;
  displayName: string;
}

export interface Season extends MatSelectOption {}

export interface SpielTag extends MatSelectOption {}


export interface MatchData {
  team1: string;
  team2:string;
  team1_goal:string;
  team2_goal:string;
  kickoff: Date;
  seasonId: string;
  spieltagId: string;
}