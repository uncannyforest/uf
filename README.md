# uncannyforest.com

To run locally for development:
```bash
npm i
npm run build
npm run start
```

These last two commands should be run in separate terminals.

To run for production:
```bash
npm i
npm run build-prod
npm run start-prod
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the site.

## Posting new comics

These are the steps for posting new comics.  For now, Ruby must be installed on your computer,
unless I bother to port the scripts to Node.js at some point.

1. Place the panel assets in `setup/panels`.
2. Edit `config/uncannyforest.yaml`.  Each entry must have a title, date, and either panels (a
  number) or layout.
3. Run e.g. `setup/img 42 43` to process panels 42 and 43 for desktop and mobile.
4. Run `setup/apush` which will run `rsync` to update comic images, the config directory, and other
  images on the server from this directory.
