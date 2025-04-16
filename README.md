# Gametime Hero Coding Challenge – Team RSVP Manager

This project contains a modular `RsvpService` built in TypeScript for managing player RSVP responses for an event.

## Features

- Add or update a player's RSVP
- Get a list of confirmed attendees
- Count total, confirmed, and declined responses
- Uses TypeScript interfaces for data modeling
- Supports dependency injection (e.g., Logger)
- Follows clean architecture principles

## Structure

- models/      -> TypeScript interfaces (Player, RsvpEntry, etc.)
- services/    -> Core logic (RsvpService)
- main.ts      -> Demo CLI to interact with the module

## How to Run

1. **Install dependencies**:
   npm install
2. **Start the application**:
   npm run start

### Acknowledgements

Special thanks to [ChatGPT](https://openai.com/chatgpt) for assisting with the creation of this project.

- The interactive CLI (`main.ts`) was built with ChatGPT's help to test and demonstrate the `RsvpService`.
- The README was also refined through AI-assisted development.
