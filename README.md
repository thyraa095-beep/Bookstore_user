# Bookstore_user

Customer website for the **Book Store** e-learning platform.

Built with **ReactJS + TypeScript + Tailwind CSS (CDN)** and connected to the
**FastAPI backend** (`/api/v1`).

## Pages
- **Home** — hero, features, featured books (live from API)
- **Products** — searchable book grid + product detail
- **Services** — services from the API
- **About** — story, stats, values
- **Contact** — contact form (saved to backend)
- **Login / Register** — JWT authentication
- **Forgot / Reset password** — token-based flow
- **Profile** — account details for logged-in users

## Setup

```bash
npm install
npm start              # http://localhost:3000
```

> Backend must be running on http://127.0.0.1:8000 (see the Bookstore repo).

## Environment

Optionally create a `.env` file to change the API URL:

```
REACT_APP_API_URL=http://127.0.0.1:8000/api/v1
```

## Build for production

```bash
npm run build
```

## Default admin (can login on the user site too)

```
admin@bookstore.com / admin123
```
