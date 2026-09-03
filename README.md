# Envato Elements Item Tracker — Netlify version

This version stores the tracker data in Netlify Blobs instead of `window.storage`.
The HTML remains the UI; `netlify/functions/data.mjs` is the server-side API.

## Deploy

1. Upload this whole folder to a Git repository.
2. Import the repository into Netlify.
3. Netlify should detect `netlify.toml`.
4. Deploy.
5. Open the deployed site and add/edit an item.
6. Open the site in another browser/device. The same data should appear.

No database URL or API key is required for the normal Netlify-hosted function setup.

## Important

The write endpoint is intentionally open because this tracker is designed as a shared editor.
Anyone who can access the site can add, edit, delete, or reset data.

If you want the tracker private or want login/permissions, add authentication before exposing the write endpoint publicly.
