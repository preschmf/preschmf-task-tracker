# Task Tracker

## Getting Started

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

## Tests

You can run the tests for each sub-project by running `npm test`. Tests are co-located in the same directory as their corresponding
source code files, and named `.test.ts`.

## Sub-projects

- `/client` - Client-side React app.
- `/server` - Server-side Node.js app.
- `/shared` - Source code and TypeScript types that are shared by `client` and `server`.

## Shared code

The `/shared` sub-project is installed in both `/client` and `/server` as an npm
dependency. Here is an example of how you can import shared code from within
those two sub-projects:

```ts
import { greet } from 'shared/src/helpers'
```
