WRC Exhibit — Local site improvements
===================================

This small site contains a few engagement-focused improvements added to help visitors view more pages and stay longer.

What's included
- Sticky "Next article" CTA with auto-hide and click tracking (console by default).
- Client-side search (`search.html`) powered by Lunr.js. Uses a prebuilt `search-index.json` if present.
- Lazy-loading images and a lazy "Load highlight" video button on `cars.html`.
- `site.config.json` to configure YouTube video ID and enable analytics (GA4 or Plausible).
- `scripts/build-search-index.js` — utility to generate `search-index.json` from HTML files.

Quick setup
1. Install Node (to run the build script) if you don't already have it.
2. Regenerate the search index after adding pages:

```bash
node scripts/build-search-index.js
git add search-index.json && git commit -m "chore: update search index" && git push
```

Enable a highlight video
1. Edit `site.config.json` and set `youtubeVideoId` to a YouTube ID (e.g. `dQw4w9WgXcQ`).
2. The "Load highlight" button on `cars.html` will then load and play the video when clicked.

Enable analytics
- In `site.config.json` set `analytics.provider` to `"ga"` (for Google Analytics 4) or `"plausible"`, and set `analytics.id` to your Measurement ID or site ID.
- The site will inject the provider script and forward events from `window.sendAnalytics`. By default events are logged to the console.

Extending search
- The build script currently scans `.html` files in the repo root. To index subdirectories or change behavior, edit `scripts/build-search-index.js`.
- For larger sites, generate a JSON index during your CI/build step and commit `search-index.json` or serve it from your web host.

Next recommended steps
- Replace placeholders in `site.config.json` for video and analytics.
- Add more pages and run the build script to keep `search-index.json` up-to-date.
- Consider adding a lightweight analytics provider (Plausible recommended for privacy) and A/B test CTA wording and placement.

Questions or want me to configure analytics or add a specific video? Reply with the Video ID or Analytics ID and I'll update `site.config.json`, commit, and push for you.
# WRC
WRC
