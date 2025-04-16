import { RsvpService, Logger } from "./services/RsvpService";
import { Player, RsvpEntry, RsvpStatus } from "./models/types";
import readline from "readline";

class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const players: Player[] = [];
const service = new RsvpService([], new ConsoleLogger());

function ask(question: string): Promise<string> {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  console.log("Welcome to the Gametime RSVP Manager!");
  let running = true;

  while (running) {
    console.log("\nChoose an option:");
    console.log("1. Add/Update RSVP");
    console.log("2. View confirmed attendees");
    console.log("3. View RSVP counts");
    console.log("4. Exit");

    const choice = await ask("> ");

    switch (choice.trim()) {
      case "1":
        const name = await ask("Player name: ");
        const id = name.trim().toLowerCase().replace(/\s/g, "-");
        const statusInput = await ask("RSVP status (Yes / No / Maybe): ");
        const status = statusInput.trim() as RsvpStatus;

        if (!["Yes", "No", "Maybe"].includes(status)) {
          console.log("Invalid RSVP status. Try again.");
          break;
        }

        const player: Player = { id, name };
        players.push(player);

        const entry: RsvpEntry = { player, status };
        service.addOrUpdateRsvp(entry);
        break;

      case "2":
        const confirmed = service.getConfirmedAttendees();
        console.log("Confirmed Attendees:");
        confirmed.forEach(p => console.log(`- ${p.name}`));
        break;

      case "3":
        const counts = service.getRsvpCounts();
        console.log("RSVP Counts:");
        console.log(`Total: ${counts.total}`);
        console.log(`Confirmed: ${counts.confirmed}`);
        console.log(`Declined: ${counts.declined}`);
        break;

      case "4":
        running = false;
        rl.close();
        console.log("Goodbye!");
        break;

      default:
        console.log("Invalid option. Try again.");
    }
  }
}

main();