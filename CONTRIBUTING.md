# Maintainers

Icons are synced from the private Food Icon Pack generator repo (`pnpm sync:food-icons-repo`).

After updating `icons/`:

```bash
node scripts/generate-readme-previews.mjs
npm run build:react
node scripts/build-release-zip.mjs   # optional smoke test
```

Tag `v*` and push to publish a new Release zip via GitHub Actions.
