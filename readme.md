# ACME Lottery App

A React Native mobile application built with Expo and TypeScript.  
This app allows users to play a lucky draw game with ticket management and purchase functionality.

## Demo Video

https://github.com/user-attachments/assets/a00af42d-31ed-4274-a757-569617b6feb6

---

### 1. Create `.env` file

```env
SECRET_KEY=mySuperSecret123
```

## Features

- Pick numbers for lucky draw tickets
- View, delete, and manage draw tickets
- Purchase tickets with confirmation
- Persistent storage using Redux Toolkit + Redux Persist
- Responsive UI with theming and custom components

---

## Tech Stack

- React Native (Expo SDK 53)
- TypeScript
- Redux Toolkit + Redux Persist
- React Navigation (Native Stack)
- Async Storage for storage
- ESLint + Prettier for code quality

---

## Prerequisites

- Node.js >= 18.x
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

---

## Installation

```bash
git clone <repository-url>
cd acme-lot
npm install
# or
yarn install
```

---

## Running the app

### Start Metro bundler

```bash
npm start
# or
yarn start
```

### Run on Android emulator/device

```bash
npm run android
# or
yarn android
```

### Run on iOS simulator/device

```bash
npm run ios
# or
yarn ios
```

### Run on web browser

```bash
npm run web
# or
yarn web
```

---

## Building & Publishing

### Build standalone apps

```bash
expo build:android
expo build:ios
```

_Note:_ With newer Expo SDKs, you may want to use `eas build` for builds:

```bash
eas build --platform android
eas build --platform ios
```

### Publish updates Over-the-Air (OTA)

```bash
expo publish
```

---

## Code Quality

### Run linter

```bash
npm run lint
# or
yarn lint
```

### Auto-fix lint errors

```bash
npm run lint -- --fix
# or
yarn lint --fix
```

---

## Project Structure

```
├── assets/              # Images, icons, fonts, colors, spacing etc.
├── src/
    ├── components/      # Reusable React components
    ├── layouts/         # Layout wrappers like MainLayout
    ├── navigation/      # React Navigation configs
    ├── screens/         # Screen components for navigation
    ├── store/           # Redux slices and store setup
    ├── theme/           # Theme variables like colors,     spacing, typography
    ├── utils/           # Constants, helper functions
├── App.tsx              # Entry point
├── prettier.config.js   # Prettier config
├── eslint.config.js     # ESLint flat config
├── babel.config.js      # Babal flat config - env
├── env.d.ts             # env base config
├── .env                 # env confidential values
└── ...
```

---

## Troubleshooting

- If you face line-ending issues with Prettier/ESLint, ensure your editor is set to use LF (`\n`) endings.
- Use `git add --renormalize .` to fix existing line endings in the repo.
- Restart your editor after config changes.
