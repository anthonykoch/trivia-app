# Trivia App

[Live Preview](https://anthonykoch.com/trivia-app)

```
 ______                                     ______
/\__  _\       __           __             /\  _  \
\/_/\ \/ _ __ /\_\  __  __ /\_\     __     \ \ \L\ \  _____   _____
   \ \ \/\`'__\/\ \/\ \/\ \\/\ \  /'__`\    \ \  __ \/\ '__`\/\ '__`\
    \ \ \ \ \/ \ \ \ \ \_/ |\ \ \/\ \L\.\_   \ \ \/\ \ \ \L\ \ \ \L\ \
     \ \_\ \_\  \ \_\ \___/  \ \_\ \__/.\_\   \ \_\ \_\ \ ,__/\ \ ,__/
      \/_/\/_/   \/_/\/__/    \/_/\/__/\/_/    \/_/\/_/\ \ \/  \ \ \/
                                                        \ \_\   \ \_\
                                                         \/_/    \/_/
```


# What is it

A completely overkill trivia app using:

- [Typescript](http://typescriptlang.org/) alongside BabelJS
- [redux-saga](https://redux-saga.js.org/)
- [react-emotion](https://emotion.sh/)
- [jest](https://jestjs.io/)
- [Storybook](https://storybook.js.org/)
- Custom webpack config (but inspired by create-react-app)



# Todo

- [Moar tests](https://cdn.frankerfacez.com/emoticon/236895/4)
- Should probably move types to their own files/to the root types file
- Reorganize imports
- Rename generic types to best practice
- Write a generic reducer for allIds?
- Fetch requests should have { type: string, status: { id: string } } instead { type: string, id: string }
- Add the current quiz to local storage
- Better use of theming


# Setup

1. Clone the repository
2. Run `npm install`

# Running the app

## Development mode

```bash
npm run dev
```

The site will be available at `localhost:5600`

## Production mode

```bash
npm run build
npx http-server build -p 4200 -a localhost
```

# Linting

View linting errors by running:

```
npm run lint
```

# Typescript

View tsc errors by running:

```
npm run tsc
```

