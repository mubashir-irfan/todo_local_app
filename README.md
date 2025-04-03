# Simple Local Todo App

[Vercel Deployment Link](https://todo-local-app-xi.vercel.app/)

Welcome to the **Simple Local Todo Demo** repository! This project is a simple yet functional todo tracker application that stores the data in localStorage

## Features

**Add Todo**:

- Click on the 'Add Todo' button in header
- Enter a unique name
- Enter a description
- Click on 'Add Todo'

**Edit Todo**:

- Click on the 'pencil' edit icon
- Edit the name or description
- Press on 'tick' icon for saving or 'cross' for discarding changes

## Tech Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/): A React framework for production.
  - [React](https://reactjs.org/): A JavaScript library for building user interfaces.
  - [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript.
  - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework. library for React
- **Testing**:
  - [Jest](https://jestjs.io/): A delightful JavaScript testing framework.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repo**

```
    git clone https://github.com/mubashir-irfan/todo_local_app.git
    cd todo_local_app
```

2. **Installing Dependencies**

Run `npm install` or `yarn install`

### Running the Application

2. **Starting the Frontend Application**

Run `npm run dev or yarn dev`
By default, the application will be accessible at `http://localhost:3000`

## Project Structure

The application follows a modular, feature-isolation structure. The structure envisions the app size and team growing with time, hence provides a feature-level isolation so that teams can work without unnecessary conflicts.

- Global entities are present directly inside src (e.g src/types)
- Feature level entities (components,types,hooks) have their isolated structure inside src/app/[feature])
- Shared entities are present inside src/shared

## Available scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Runs the built application in production mode.
- `npm run lint`: Lints the codebase for potential issues.
- `npm run format`: Runs the prettier format and writes changes
- `npm run test`: Runs the test suite.
