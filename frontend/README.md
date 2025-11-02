# Around — Social Photo Sharing Frontend

This project is a React-based single-page application that powers the client side of the Around photo sharing platform. Users can register, sign in, manage their profile, upload new places, like cards, and view images in a modal lightbox.

## Features

- **Authentication flows** — registration and login backed by JWT tokens.
- **Protected routing** — redirects unauthenticated visitors to the sign-in page.
- **Profile management** — edit name, bio, and avatar from modal forms.
- **Card interactions** — add new cards, like/unlike, and delete cards you own.
- **Responsive layout** — works across desktop and mobile viewports.

## Tech Stack

- React 19
- React Router DOM 7
- Vite 7 for development/build tooling
- Context API for global state sharing
- Vanilla CSS (BEM methodology)

## Getting Started

```bash
npm install
npm run dev
```

The app expects the backend API to run at `http://localhost:3001`. Update `src/utils/api.js` and `src/utils/auth.js` if your backend uses a different origin.

## Project Structure

```
src/
  components/
    App.jsx
    Header/
    Main/
      components/
        Card/
        Popup/
    Login.jsx
    Register.jsx
    InfoTooltip.jsx
  contexts/
  utils/
  images/
blocks/
vendor/
```

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — create a production bundle
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## License

This project is distributed under the MIT License. See the root repository for full terms.
