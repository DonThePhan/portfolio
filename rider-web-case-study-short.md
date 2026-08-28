# Rider Web

**Design engineer · Strategic Mapping · 2024–2025 · [sunrail-account.transitsherpa.com](https://sunrail-account.transitsherpa.com/)**

SunRail needed a fare-collection portal. We had a mobile-ticketing companion. I was the only frontend developer, and the platform we'd have built it on had reached end of life — so I designed the new product in Figma with the client, then argued for rebuilding the foundation underneath it in React. Five pages became eleven. Eighteen months later, onboarding the second agency took six weeks.

> `[IMAGE — hero. One screen, full width. Not a collage.]`

---

## A different product, not a bigger one

Rider Web was our multi-agency platform for transit clients: a companion to mobile ticketing, where riders bought a ticket and managed an account. Five pages — landing, sign-in recovery, buy tickets, my account.

SunRail arrived as a new client needing something else: a full AFC (Automated Fare Collection) customer website. Automated Fare Collection is how an agency takes fares without cash at the door, and the rider-facing side of it is a different product from a ticketing companion. Their spec included reloadable fare cards (SunCards), tap and usage history, auto-replenish, twelve months of history for registered and unregistered riders, and PDF and Excel export.

None of it existed in the platform. This wasn't a bigger version of what we had; it was a category change.

**Team:** one frontend developer (me), one full-stack, five backend.

---

## Designing it first

I started with the design, working through four months of requirements back-and-forth with SunRail.

The team's client design documents were being assembled in PowerPoint — screens built as screenshots, slide by slide. With a spec this size and a client iterating this often, every revision meant a manual sweep across every slide where an element appeared. I proposed Figma and demonstrated it rather than arguing for it: components, components nested inside components, one edit cascading through every instance. The value was visible in a few minutes.

That library became the reference for the build — the same component boundaries in Figma and later in React.

> `[IMAGE — the Figma component library structure and a component with its variants.]`

---

## The turn

With the design settled, I spent a week inside the existing AngularJS codebase planning the build.

State moved badly. It lived in scopes and services rather than flowing in one direction, and two-way binding meant a change in one place could surface somewhere unrelated. Tracing why a value had changed meant reading through much of the app. I was about to more than double the page count and add fare collection, card management, and payment processing to it — alone.

Then I looked at the framework rather than the code. AngularJS reached end of life in December 2021 — final release, repository archived, no further patches of any kind including security. By the time we started, it had been unsupported for three years. Rider Web is public-facing software operated by government transit agencies, and any vulnerability disclosed from that point forward had no official fix.

Building an AFC portal on that foundation was the wrong move twice over.

---

## The recommendation

Rebuild in React, then build the new product on the new foundation.

The objection to any rewrite is cost, and the answer here is that a rewrite was already the floor. Moving from AngularJS to modern Angular is not an upgrade — the frameworks share a name, not an architecture, and the migration is a ground-up rebuild. Once a rewrite is unavoidable, the only question is the target.

React, for three reasons. Staying meant carrying a permanent unpatchable exposure on public software for government clients. A rewrite was required regardless of destination, so choosing React didn't add one. And my experience was heavily React, so there was no ramp — worth naming plainly, because when one developer owns the design and the entire frontend, their ramp time is a real line on the schedule.

Approved. Scope became: replace the foundation, then build the AFC product on it.

With the rebuild underway I also tightened what the old app had left loose: a defined type scale across heading levels and a defined spacing system. Tailwind helped by narrowing the vocabulary — a fixed set of sizes and steps to choose from, so consistency came from constrained options rather than from remembering. The components did the rest. A shared pattern is styled once where it's defined and inherited everywhere it's used, which is the same mechanism the Figma library was already giving the design side.

---

## Designing for a configuration, not a screen

The platform is multi-agency. We built and proved the new one with SunRail, then brought Cascades East Transit onto the same system. Agency differences arrive from the backend as a config object:

```javascript
const locales = ['en', 'es'];
const processor = 'nic';
const autoReplenish = true;
const oneTimePayment = true;
const riderTypeSelect = true;
const fareCapping = false;
const promotions = false;
const registrationFields = {
  name: 'optional',
  mobile: 'optional',
  address: 'optional',
  city: 'optional',
  state: 'optional',
  zipCode: 'optional'
};
```

So I wasn't designing screens. I was designing the range of screens a configuration could produce.

The account creation page carries this hardest. Two fields are fixed for every agency — email and password. Everything else is configurable: first name, last name, phone, two address lines, city, state, zip. Each can be required, optional, or absent. The form has to read as intentional at both ends of that range, whether an agency asks for two fields or ten, and it can't look like a template with holes in it when they choose the short version.

Localization cost less than expected, and for a reason worth stating: text was soft-coded and the layout sized to content rather than to fixed dimensions, so Spanish paragraphs simply ran taller and buttons grew to fit. SunRail shipped with an English/Spanish toggle in the header and no layout changes.

> `[IMAGE — the annotated config, 4–5 callouts. Anchor image of the page. Redact the client ID and internal hostname.]`
> `[IMAGE — the account creation form resolving under two different agency configs.]`
> `[IMAGE — the same screen for SunRail and Cascades East.]`

---

## The screen that was actually hard: auto-load

Auto-load lets a rider set their balance to top up automatically below a threshold. It wasn't shipping in phase one, but it had to exist in the system ready to switch on — so it went in as a flag, and the design had to hold across every state that flag creates.

It resolves through a chain of conditions:

- Feature disabled by config — nothing appears.
- Enabled, but no payment method connected — still nothing. Auto-load without a card is a dead control, so it doesn't exist yet.
- Payment method connected — the toggle appears.
- Toggled on — threshold and amount fields expand into view.
- Toggled on but never saved — reverts on logout. Session state isn't a setting.
- Saved — fields stay populated across refresh and re-login.

The save button tracks whether the values differ from what's stored: it greys out when they match and activates the moment they don't, so the control itself tells the rider whether they have unsaved changes. Saving confirms with a notification.

Six states, one screen, and most riders will only ever see two of them. The work was making sure the ones they land in never feel like a fragment of something larger.

> `[IMAGE — auto-load across its states. A sequence, not a single screenshot. This is the most differentiating image on the page.]`

**Payment.** SunRail had an agreement with NIC as their processor, so checkout embeds NIC's own card input. Fraud-prevention requirements meant a long integration, and the embedded fields came with their own appearance — I could only style them within the options NIC exposed. The design problem became making a component I didn't control sit inside a page I did, without the seam showing.

---

## What stayed

SunRail asked for material to be moved and some of it dropped, but the theme held. The result reads as the same product family: recognizably Rider Web, reorganized, with a great deal more in it.

That constraint shaped the new work. Six pages that had never existed had to feel like they always had, which meant extending the existing visual language rather than replacing it — harder than a clean slate, not easier.

> `[IMAGE — 2–3 new screens, one-line captions naming the problem each solves.]`

---

## Where it landed

Four months of design, then just over a year of build — eighteen months in all. Bringing Cascades East onto the finished platform took six weeks.

Those aren't measuring the same thing, and that's the point — the first includes building the system, the second is what it costs to use it. The year bought a platform where adding an agency is a configuration problem rather than a development project.

---

## Notes to self — delete before publishing

**Redact:** the client ID GUID and the internal staging hostname. This page is public and indexable.

**Get clearance** from your CTO before publishing — specifically on naming SunRail, CET, and NIC, quoting the requirements, and showing screenshots.

**Don't write** that the backend slowed you down. Fine to say aloud if an interviewer asks why a year; reads as blame-shifting in print. The team composition line answers it honestly already.

**"What stayed" is accurate as written** — the client drove the reorganization, and the theme continuity was a constraint you designed within, not a principle you chose. The judgment is in how you extended it. Leave it framed that way.

**This is ~950 words**, up from the 600 target. The auto-load section earns the overage. If you need to cut, take it from "Designing it first" or "The recommendation," not from auto-load.

**Build it as a page**, not a PDF. Real syntax-highlighted code, not a screenshot of code. Don't over-design the page.

**Test:** if someone reads only the headers and looks at the images, they should still get the story.
