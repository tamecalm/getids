# GetIDs Bot

## Overview

GetIDs Bot is a simple bot designed to extract user IDs from messages. It is built using Node.js and leverages environment variables for configuration. The project is structured to be modular and easy to maintain.

## Features

- Extracts user IDs from messages.
- Logs messages and errors to the console.
- Configurable via environment variables.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/tamecalm/getids.git
   cd getids
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a [.env](http://_vscodecontentref_/3) file in the root directory and add your bot token:
   ```env
   BOT_TOKEN=your_bot_token_here
   ```

## Usage

1. Start the bot:

   ```sh
   node bot.js
   ```

2. The bot will log messages and errors to the console.

## Configuration

- `botConfig.js`: Loads environment variables using `dotenv` and exports the bot token.
- `userService.js`: Contains the logic to extract user IDs from messages.
- `logger.js`: Provides logging functionality for messages and errors.

## Linting

This project uses ESLint for linting. The configuration is defined in [eslint.config.mjs](http://_vscodecontentref_/4):

- Recognizes browser-specific global variables.
- Applies recommended ESLint rules for JavaScript.

## Module Resolution

The [jsconfig.json](http://_vscodecontentref_/5) file is configured to:

- Use the latest ECMAScript features, including ES6 modules.
- Use Node.js module resolution strategy.
- Set the base directory for resolving non-relative module names.
- Map the root import path to the [src](http://_vscodecontentref_/6) directory.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
