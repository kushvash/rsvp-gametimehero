export interface Player {
    id: string;
    name: string;
  }
  
  export type RsvpStatus = "Yes" | "No" | "Maybe";
  
  export interface RsvpEntry {
    player: Player;
    status: RsvpStatus;
  }