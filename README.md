# Donny Phan — Portfolio

Personal portfolio site. React + Vite + Tailwind CSS, deployed to Firebase Hosting.

## Development

```bash
npm install
npm run dev
```

Runs at [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Outputs to `dist/`. Preview the production build locally with `npm run preview`.

## Deploy

Pushes to `main` deploy to Firebase Hosting via GitHub Actions
(`.github/workflows/firebase-hosting-merge.yml`). Pull requests get a preview
channel automatically.

## Stack

| | |
|---|---|
| Framework | React 19 |
| Build | Vite |
| Styling | Tailwind CSS 4 (CSS-first config in `src/index.css`) |
| Routing | React Router 7 |
| Hosting | Firebase Hosting (`portfolio-247f2`) |
| Analytics | Google Analytics (gtag) |

### A note on `src/index.css`

The original build used daisyUI 2 for exactly three things: the `.divider`
rule, the neutral colour pair behind the nav tooltips in `Nav.module.css`, and
a couple of classes on the 404 page. daisyUI 5 renamed those variables, so
rather than carry the dependency the handful of values actually used are
reproduced directly in `src/index.css`.
