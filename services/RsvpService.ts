import { Player, RsvpEntry } from "../models/types";

export interface Logger {
  log(message: string): void;
}

export class RsvpService {
  private rsvpList: Map<string, RsvpEntry>;
  private logger?: Logger;

  constructor(initialEntries: RsvpEntry[] = [], logger?: Logger) {
    this.rsvpList = new Map();
    this.logger = logger;

    initialEntries.forEach(entry => {
      this.rsvpList.set(entry.player.id, entry);
    });

    this.logger?.log(`Initialized with ${this.rsvpList.size} RSVP entries.`);
  }

  // Add/update RSVP
  addOrUpdateRsvp(entry: RsvpEntry): void {
    this.rsvpList.set(entry.player.id, entry);
    this.logger?.log(`RSVP updated for ${entry.player.name} as "${entry.status}"`);
  }

  // List of players who have RSVP’d "Yes"
  getConfirmedAttendees(): Player[] {
    return Array.from(this.rsvpList.values())
      .filter(entry => entry.status === "Yes")
      .map(entry => entry.player);
  }

  // Summary of total responses: total, confirmed (Yes), and declined (No)
  getRsvpCounts(): { total: number; confirmed: number; declined: number } {
    let confirmed = 0;
    let declined = 0;

    for (const entry of this.rsvpList.values()) {
      if (entry.status === "Yes") {
        confirmed++;
      } else if (entry.status === "No") {
        declined++;
      }
    }

    return {
      total: this.rsvpList.size,
      confirmed,
      declined,
    };
  }
}