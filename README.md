![Project screenshot](./screenshot.png)

# Sidewalk | Local Event Discovery

Sidewalk is a neighborhood event guide for finding markets, music, workshops, walks, and other local plans around Portland, Oregon.

**Live demo:** [https://a2rp.github.io/local-event-discovery/](https://a2rp.github.io/local-event-discovery/)

**Repository:** [https://github.com/a2rp/local-event-discovery](https://github.com/a2rp/local-event-discovery)

## What is included

- A discovery page with a local search field and a photo-led event collection.
- Nine example Portland events with their date, time, neighborhood, venue, cost, host, description, and tags.
- Search across event names, categories, neighborhoods, venues, hosts, descriptions, and tags.
- Filters for event category, today, this weekend, the next seven days, and neighborhood.
- A saved-events filter and a heart button on each event card.
- A details dialog with event information and an interest toggle.
- Neighborhood shortcuts that filter the event list by area.
- A fixed responsive header with smooth section links and the public repository link.
- A Back to top button that appears after scrolling more than 50 pixels.
- A responsive footer with the project logo, copyright, source code, contact, and support links.
- Locally stored event photos. The app does not request Picsum images at runtime.

## How to use it

1. Search from the opening section, or scroll down to browse the event cards.
2. Choose a category, date, or neighborhood from the filter panel. Combine filters to narrow the results.
3. Use a neighborhood card below the event list to show events in that area.
4. Select **Details** to view the full description, host, time, location, cost, and event tags.
5. Select the heart on a card or **Save event** in the details dialog to keep an event in your saved list.
6. Select **I'm interested** to mark an event for yourself. Select the button again to clear your interest.
7. Choose **Saved events** in the filter panel to see only events you saved. Choose **Clear filters** to return to the full list.

The date filter uses the current local calendar date. **This weekend** means the upcoming Friday through Sunday, or the remainder of the weekend when today is Saturday or Sunday. **Next 7 days** includes today and the following six days.

## Saving and privacy

Saved event IDs and personal interest markers are stored in this browser's localStorage. They stay on this device and are not sent to a server or synchronized with another browser. Clearing this browser's site data removes them. If browser storage is unavailable, the app shows a notice and changes only last until the page is closed.

The events are sample listings included with the app. Marking interest is a personal planning aid, not a booking, ticket purchase, or public RSVP. The example attendance counts are not live counts.

## Run locally

Use Node.js and npm, then run these commands from the project folder:

```sh
npm install
npm run dev
```

Vite prints the local development address in the terminal. Open that address in a browser.

## Code checks and preview

```sh
npm run lint
npm run build
npm run preview
```

ESLint checks the project source. The production build is written to dist, and npm run preview serves that build locally.

## Deploy

The project deploys to GitHub Pages from the gh-pages branch. The npm command builds the site before publishing the contents of dist:

```sh
npm run deploy
```

**Website:** [https://a2rp.github.io/local-event-discovery/](https://a2rp.github.io/local-event-discovery/)

## Future improvements

These are ideas and are not implemented in this version:

- Connect to a live event feed and let organizers submit or edit listings.
- Add a real map with directions and distance from a selected location.
- Add event reminders and calendar export.
- Add ticket booking and a real RSVP list.
- Add a location picker for cities beyond the Portland sample area.

## Links

- Portfolio: [https://www.ashishranjan.net](https://www.ashishranjan.net)
- GitHub: [https://github.com/a2rp](https://github.com/a2rp)
- CodePen: [https://codepen.io/ash1198](https://codepen.io/ash1198)
- LinkedIn: [https://www.linkedin.com/in/aashishranjan](https://www.linkedin.com/in/aashishranjan)
- Facebook: [https://www.facebook.com/theash.ashish/](https://www.facebook.com/theash.ashish/)
- YouTube: [https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1](https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1)
- Email: [mailto:ash.ranjan09@gmail.com](mailto:ash.ranjan09@gmail.com)

## Support

- Support: [https://a2rp-donation-page.netlify.app/](https://a2rp-donation-page.netlify.app/)
- Buy Me a Coffee: [https://buymeacoffee.com/ashishranjan](https://buymeacoffee.com/ashishranjan)
- Patreon: [https://www.patreon.com/ashishranjan](https://www.patreon.com/ashishranjan)
