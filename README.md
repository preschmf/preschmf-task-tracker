# Task Tracker

This is a full-stack task tracker/todo list app. It is a monorepo app that uses:

- A React and Typescript frontend, bundled with Webpack.
- Fastify for the backend server, and SQLite for the database.
- Jest for unit tests

The app uses [passport.js](https://www.passportjs.org/) to implement OAuth2.0 for authentication of a user with either GitHub, Google, or LinkedIn strategies. The user can then create boards and tasks on those boards. [Knex](https://knexjs.org/) is used to construct queries made to the [SQLite](https://sqlite.org/) database. Every board and task are stored in the database in order to persist data after each login.

## Why this app?

I created this app for three main reasons:

- To get more practice with SQL databases
- To explore implementing OAuth and using it to authenticate a user and persist data
- To explore creating, and maintaining, a monorepo project

This app spiraled to quite a large size, larger than I thought a task tracking app with a DB would become. Along the way I worked through many quirks with the monorepo architecture. Mainly, managing the three separate package.jsons could become tricky. In addition, trying to keep the client and the server separate, sharing no code, took some forethought. One of the inspirations for making this project a monorepo came from my role at work. At the time, we were exploring turning our frontend webapp, and its experience API, into a monorepo. Ultimately, we decided not to, and I think some of the lessons I learned from this project informed that decision.

## Screenshots

### Login Page:

![image](https://github.com/user-attachments/assets/1fdbf0b2-48ca-4bc0-bd19-233af38a2134)

### Boards Page with Task Creation:

![image](https://github.com/user-attachments/assets/cdeb8ad8-7879-4ea7-8024-e5b6a41c9a72)

### Boards Page with Board Creation Modal:

![image](https://github.com/user-attachments/assets/fd458953-4cec-4f52-9372-85a2f4c22a4a)

## Using the App

### Getting Started

To get started with this repo, install each sub-projects dependencies:

```bash
cd shared && npm i
cd ../client && npm i
cd ../server && npm i
```

_Note: this step also sets up `husky`, `prettier`, and `pretty-quick` to re-format any code changes on a pre-commit hook._

Afterward, set up your local SQLite database:

```bash
cd server && npm run migrate && npm run seed
```

The database will be created in the file `server/task-tracker.local.sqlite3`. You can install the VS Code extension
[SQLite Viewer](https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer) to browse the database.

### Tests

You can run the tests for each sub-project by running `npm test`. Tests are co-located in the same directory as their corresponding
source code files, and named `.test.ts`.

### Sub-projects

- `/client` - Client-side React app.
- `/server` - Server-side Node.js app.
- `/shared` - Source code and TypeScript types that are shared by `client` and `server`.

### Shared code

The `/shared` sub-project is installed in both `/client` and `/server` as an npm

dependency. Here is an example of how you can import shared code from within
those two sub-projects:

```ts
import { greet } from 'shared/src/helpers'
```

### Postman

A postman file exists to test the endpoints on the backend: [collection](https://github.com/preschmf/preschmf-task-tracker/blob/main/Task-Tracker.postman_collection.json)
