# Prime Bank App

A modern, secure, and responsive banking application built with React Native (Expo).

## 🚀 Features

-   **Secure Authentication**: Biometric support and persistent login using SecureStore.
-   **Financial Management**: View balance, track expenses/incomes, and upload receipts.
-   **Transactions**: Create and manage transactions with currency validation and categorization.
-   **Receipt Upload**: Upload images and PDF receipts for transactions.
-   **Responsive UI**: Modern interface with smooth animations and toast notifications.
-   **Offline First**: Optimistic updates and caching strategy.

## 🛠 Tech Stack

-   **Frontend**: React Native, Expo, TypeScript
-   **Architecture**: Clean Architecture (Domain, Data, Presentation layers)
-   **State Management**: Zustand (including persistence)
-   **Data Fetching & Caching**: TanStack Query (React Query)
-   **Styling**: NativeWind (TailwindCSS)
-   **Validation**: Yup
-   **Navigation**: Expo Router

## 📂 Project Structure

```
src/
├── app/              # Expo Router (Navigation)
├── data/             # API services and data repositories
├── domain/           # Business logic and entities
├── infrastructure/   # External services adapters
├── presentation/     # UI Components, Pages, Stores, and Hooks
└── utils/            # Helper functions, masks, and validators
```

## ⚡ Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the app:**
    ```bash
    npx expo start
    ```

3.  **Run on Android/iOS:**
    -   Press `a` for Android Emulator
    -   Press `i` for iOS Simulator

## ✅ Code Quality & Best Practices

-   **Clean Architecture**: Separation of concerns between UI, Business Logic, and Data.
-   **Atomic Design**: Components organized for reusability.
-   **Type Safety**: Full TypeScript implementation.
-   **Performance**: Memoization (`useCallback`, `useMemo`) and query caching.
