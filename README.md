# Star Wars Fan Portal

A React + TypeScript project that fetches and displays information about Star Wars films and their characters using the SWAPI - The Star Wars API.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **About Page**: Provides random text about the Star Wars universe.
- **Films Page**:
  - Lists all Star Wars films with their titles, episode IDs, and release dates.
  - Displays characters of a selected film including their name, gender, birth year, and mass.

## Technologies

- React: For building the UI components.
- TypeScript: For static typing.
- Redux: For state management.
- Redux Thunk: Middleware for handling asynchronous actions in Redux.
- Tailwind CSS: For styling.

## Getting Started

Follow these steps to set up the project in your local environment.

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/star-wars-fan-portal.git
   cd star-wars-fan-portal

2. **Install Dependencies**:
    ```bash
    npm install

3. **Run the Development Server**:
    npm start

## Available Scripts

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm build`: Builds the app for production.

## Project Structure

- `src/`: Contains all the source code.
  - `components/`: Contains all the React components.
  - `redux/`: Contains Redux-related files like actions, reducers, and types.
  - `utils/`: Contains utility functions.
- `public/`: Contains static files.

## Contributing

1. Fork the repository and clone it.
2. Make your changes in a new git branch.
3. Commit your changes and push to your fork.
4. Open a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
