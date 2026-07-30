# Swashbuckler 2027 mobile app prototype

## What this is
A mobile-first Progressive Web App (PWA) prototype for the 2027 Swashbuckler trip.

## Included
- Countdown and event overview
- Three-day itinerary
- Course cards
- Roster and nicknames
- Competition formats
- Functional local leaderboard
- Budget and payment tracker
- Pre-trip checklist
- Offline shell support through a service worker

## Open locally
Open `index.html` in a browser. Some browsers block service workers on local files, but the app itself will still run.

## Put it on everyone's phone
Host the folder using a service such as Netlify, Vercel, GitHub Pages, or Cloudflare Pages. Then participants can open the URL and use "Add to Home Screen."

## Important prototype note
The app currently uses externally hosted course-style background photos as placeholders. Replace those with licensed/approved Big Cedar Lodge and course imagery before publishing.

## Recommended next build phase
1. Finalize tee times, airport, lodging details, and room assignments.
2. Decide whether 2027 teams/formats remain the same.
3. Add authentication or a simple access code.
4. Connect a cloud database for shared live scoring and announcements.
5. Add push notifications and a trip photo feed.


## Responsive design update
This version is optimized for:
- Phones: bottom navigation, stacked cards, touch-sized controls
- Tablets: wider multi-column layouts
- Desktop/laptop: persistent left sidebar, wider hero, four-column quick actions, multi-column itinerary and roster

No separate mobile and desktop sites are required. The same code automatically adapts using responsive CSS breakpoints.
