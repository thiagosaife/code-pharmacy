# THIAGO SAIFE // CODE PHARMACY

Personal portfolio built with Vite + TypeScript.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The static output is generated in `dist/`.

## GitHub Pages Deployment

This repository includes a workflow at `.github/workflows/deploy-pages.yml` that deploys on every push to `main`.

After pushing to GitHub, configure Pages once:

1. Open repository `Settings` -> `Pages`.
2. In `Build and deployment`, set `Source` to `GitHub Actions`.
3. Push to `main` (or run the workflow manually in the `Actions` tab).

Your site will be published at:

`https://thiagosaife.github.io/code-pharmacy/`

## Troubleshooting

- If the workflow fails on deploy permissions, confirm `Settings` -> `Actions` -> `General` allows workflow read/write permissions.
- If the site shows an older version, purge browser cache and wait 1-2 minutes for Pages CDN refresh.
- The `private` field in `package.json` does not control repository visibility on GitHub.
