export interface OpponentData {
  name: string;
  realm: string;
  ilvl: string;
  spec: string;
  url: string;
  error?: string;
}

export interface CombatantInfoEvent {
  playerGUID: string;
  faction: number;
}
