export interface Opponent {
  name: string;
  realm: string;
  ilvl: string;
  spec: string;
  url: string;
  error?: string;
}

export type ConnectionStatus = "disconnected" | "connecting" | "connected";
