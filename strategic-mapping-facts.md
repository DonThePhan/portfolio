# Strategic Mapping — Canonical Facts

Single source of truth for résumé, LinkedIn, GitHub README, portfolio, and case studies.
Anything that contradicts this file is wrong. Update here first, then propagate.

**Last updated:** 2026-08-29

---

## 1. Employment

| Fact | Canonical value |
|---|---|
| Employer | Strategic Mapping Inc. |
| Title | **Design Engineer** |
| Start date | **November 2022** |
| Tenure | ~4 years (as of late 2026) |
| Location | Toronto (remote-capable) |

### Pre-software career — **8 years total**
| Role | Employer | Duration |
|---|---|---|
| Mechanical designer | Spec Furniture | 4 years |
| Mechanical designer | Array Marketing | just under 1 year |
| Project manager | Array Marketing | a bit over 3 years |

So: **~5 years mechanical design, ~3 years project management.** Say **eight years**, never seven or nine.

**Tenure rule:** the ~4 years attaches to **Strategic Mapping**, not to Rider Web.
Never write "4 years on Rider Web."

---

## 2. Rider Web

Multi-agency transit platform. Rider-facing Automated Fare Collection (AFC) portal.

### Timeline
| Fact | Canonical value |
|---|---|
| Project dates | **2023–2025** (started 2023) |
| Total duration | **2 years**, including testing |
| Requirements + design documentation | **~6 months cumulative** |
| Onboarding 2nd agency (CET) | **6 weeks** |

**Sequencing rule — this matters.** The 6 months was **not** an upfront design phase followed by a build. It was interleaved: build Rider Web, return to the design docs, update them in Figma, build again. Any copy that says "X months of design, *then* the build" is wrong about how the work actually ran. Say "cumulative" or "across the project."

### Scope
| Fact | Canonical value |
|---|---|
| Pages | Grew **5 → 11** |
| Role | Sole designer **and** sole front-end developer |
| Team size | **7 total** — 1 front-end (Donny), 1 full-stack, 5 back-end |
| Agencies | SunRail (Orlando, FL) · Cascades East Transit (Oregon) |
| Live URL | https://sunrail-account.transitsherpa.com/ |
| Payment processors | NIC (SunRail) · Braintree (CET) |
| Languages | English / Spanish toggle (SunRail) |

### Feature set built
Account creation · transit card (SunCard) management · pass and stored-value purchasing · auto-load / auto-replenish · tap and usage history · 12 months of activity for registered and unregistered riders · PDF and Excel export

### Scale metrics
| Metric | Value |
|---|---|
| Registered riders | 70,000+ |
| Daily riders | 5,000 |
| Fares processed | $5.5M **as of ~June 2026** |

Use "5,000 daily riders" as the standard form, not "thousands of daily commuters." Pick one and keep it.
Always date the fares figure — "$5.5M to date" with no anchor goes stale silently while you keep quoting it.
→ **These belong in the case study.** See §8.

### Client-facing work
Worked **directly with SunRail** through six months of requirements, and **ran product demos of Rider Web for the client**. This is not brief-receiving — never write "CTO brief."

### The framework decision
- Rider Web ran on **AngularJS**, which reached end of life **December 2021** — final release, repo archived, no patches including security.
- By project start in 2023 it had been unsupported **~2 years**.
- Rider Web is public-facing software operated by **government transit agencies**, so any disclosed vulnerability had no official fix.
- Donny spent **a week** planning the build inside the AngularJS codebase, then assessed the framework rather than the code.
- Argued that a rewrite was already the floor (AngularJS → modern Angular is a ground-up rebuild, not an upgrade), so the only real question was the target. Chose **React**: no permanent unpatchable exposure, no added cost over the unavoidable rewrite, and no ramp time for the sole front-end owner.
- Approved. Scope became: replace the foundation, then build the AFC product on it.

**Rider Web was new to Donny when SunRail arrived.** He was already at Strategic Mapping (since Nov 2022) but had not worked on this platform. Use "assigned to" or "took over," never "brought on" (implies hired for it) and never "found" alone (implies stumbling).

### Design system work
- Introduced **Figma** at Strategic Mapping, replacing PowerPoint for client-facing design documents. Won the switch by demonstrating components, nested components, and cascading edits.
- Defined **type scale** across heading levels and a **spacing system**. Tailwind narrowed the vocabulary to a fixed set of sizes and steps.
- Shared React component library across both agency deployments.
- **Figma component-system library** — being rebuilt from the original basic files into a proper variant-and-token-driven library. ⚠️ Don't claim this in artifacts until it exists; it's the exact gap design-system interviewers probe.

### Config-driven multi-agency architecture
Agency differences arrive from the **backend** as a config object: base URL, scope, payment processor, analytics ID, feature flags (auto-replenish, one-time payment, rider type select, migration, fare capping), and registration field rules (each field required / optional / absent).

**Framing rule:** Donny designed *the range of screens a configuration can produce* — he did not architect the backend config system. Don't claim "structured agency differences as backend-supplied configuration" unless he specified the config shape.

Account creation is the hardest case: two fixed fields (email, password), everything else configurable. Must read as intentional whether an agency asks for 2 fields or 10, and never like a template with holes in it.

### Auto-load (the strongest craft example)
Feature-flagged, not shipped in phase one but built ready to switch on. **Six states:**
1. Disabled by config — nothing appears
2. Enabled, no payment method — still nothing (a dead control shouldn't exist)
3. Payment method connected — toggle appears
4. Toggled on — threshold and amount fields expand
5. Toggled on, never saved — reverts on logout
6. Saved — persists across refresh and re-login

Save button greys out when values match stored state, activates when they differ. Most riders will only ever see two of the six.

**This is the evidence for any progressive-disclosure claim.** Don't state the preference without pointing at this.

### Constraints worth naming
- **Continuity, not clean slate.** SunRail asked for material to be moved and dropped, but the theme held. Six pages that had never existed had to feel like they always had — extending the existing visual language, which is *harder* than a clean slate. **Never say "from scratch."**
- **The NIC seam.** Checkout embeds NIC's own card input; fraud-prevention rules made integration long, and the fields came with their own appearance, stylable only within what NIC exposed. The problem was making a component he didn't control sit inside a page he did without the seam showing.
- **Localization was cheap for a reason.** Text soft-coded, layout sized to content rather than fixed dimensions — Spanish ran taller and buttons grew. Shipped with no layout changes.

### Accessibility
❌ **Do not claim WCAG 2.1 AA.** Rider Web is not fully compliant. Removed from all artifacts.

### The closing metric
Two years to build the system; **6 weeks** to onboard the second agency. Those measure different things, and that's the point — the build bought a platform where adding an agency is a configuration problem, not a development project.

---

## 3. TOMS

Agency back-office platform. Separate product from Rider Web.

| Fact | Canonical value |
|---|---|
| Role | Design director and technical lead |
| Work | AngularJS → React modernization |
| Method | Directed Claude page by page; reviewed and corrected every screen; each art-directed before generation |
| Duration | **2 months** |
| Screens | 55 |

❌ The old "55 screens in 3 weeks" figure is **retired**. It's 55 screens in 2 months. Remove from README and LinkedIn.

### Tooling progression
GitHub Copilot → Cursor → Claude Pro → **Claude Max**, which he stayed on through the end of the project — more capable, and enough headroom that daily usage limits stopped being a constraint on throughput.

Available detail if a conversation goes there. Probably too granular for the README or LinkedIn, but it's real evidence of evaluating tools against the work rather than adopting one and stopping — which is a more useful thing to demonstrate in an interview than tool familiarity itself.

**Scoping rule:** AI-directed development is a **TOMS** claim, not an identity claim. Rider Web was hand-built craft — a week reading a codebase, six months of client requirements, six-state interaction design. Never let "I direct AI, the typing is the fast part" sit above Rider Web, or readers arrive at the case study expecting generation and find craft.

---

## 4. CET Go

The **mobile app version of Rider Web**, running on the same backend. Where Rider Web is data-oriented (manage an account, review history, export activity), CET Go is action-oriented: buy passes, activate them, scan passes from the phone at the stalls.

| Fact | Canonical value |
|---|---|
| Relationship to Rider Web | Same backend, mobile surface, action-oriented |
| Donny's contribution | **Theme and graphics** |
| Tool | Figma |

⚠️ Current README and LinkedIn say "interface and brand design," which overstates it. Correct to theme and graphics.

Because it shares the backend, this reads better as a **sub-item under Rider Web** than as a fourth standalone project.

---

## 5. Work since Rider Web (2025–present)

Rider Web's main build ended in 2025, but nothing stopped cleanly — this is the answer to "what have you been doing for the last year."

| Work | Status |
|---|---|
| **Rider Web — maintenance** | Bug fixes and small requested updates since launch. Maintenance, not new phases. |
| **Cascades East Transit** | Maintenance after the 6-week deploy. |
| **TOMS — ongoing** | Complete but semi-active. Updates and occasional bug fixes. |
| **Ticket vending machine interfaces** | Graphic interfaces for TVMs. Mostly AI-generated. ⚠️ needs dates + scope |
| **Web accessibility remediation** | Current work. Scanning one of the company's sites with accessibilitychecker.org and remediating findings with AI assistance. ⚠️ which site? which standard? |

**CET onboarding is 6 weeks, full stop.** Everything after is maintenance — small requested updates and bug fixes. Don't inflate it into "phase 2 and 3"; the 6-week figure is the claim and it's cleaner without qualification.

**Framing note.** Recent work is **context, not a selling point**. One sentence in the LinkedIn experience entry so the timeline doesn't read as a gap after 2025 — nothing more. The body of work is two years building an AFC platform, a legacy modernization, and a second-agency launch. That doesn't need this quarter propping it up.

### Accessibility — scope this one carefully

The method is an automated scan (accessibilitychecker.org) plus AI-assisted remediation. That sets a ceiling on what can honestly be claimed.

Automated scanners catch roughly a third of WCAG success criteria: missing alt text, colour-contrast failures, unlabelled form fields, missing landmarks. They cannot evaluate keyboard navigation order, focus management, screen-reader announcement quality, whether alt text is *meaningful*, or whether an interaction makes sense non-visually.

- ✅ Defensible: "running automated accessibility audits and remediating findings on a live transit product"
- ❌ Not defensible: "brought the platform to WCAG 2.1 AA compliance," "accessibility specialist," "accessibility-approved"

A senior UX engineer will ask which criteria a scanner misses, whether you've tested with a screen reader, and how you handled focus order. Have an answer or leave the topic alone. The honest version still reads well — automated audit, remediation underway, aware it's a floor not a ceiling — and it survives follow-up questions, which the stronger version won't.

**Highest-leverage gap to close.** Manual keyboard and screen-reader testing on two or three key flows would turn a tooling claim into a craft claim. Accessibility is a standard interview topic for every role being targeted, and right now it's the thinnest area relative to how often it comes up.

---

## 6. Positioning

- **Design Engineer** — designs interfaces and builds them in production.
- Line: "I own interfaces from brief to shipped, Figma to React, without the handoff."
- Open to remote **Design Engineer / UX Engineer / Product Designer** roles with U.S. companies. Canadian resident, no visa sponsorship required.
- **Résumé:** one version — *Design Engineer Resume*. No role-specific variants.

---

## 7. Choosing metrics

Screen and page counts are **scope markers, not achievements**. They tell a reader how big something was, never how hard. Use them for context; never land a bullet on one.

### The rule
A metric earns a bullet when it measures something **only this project could produce**. If a competent person could hit the same number on an easier project, the number is doing no work.

### Per project

**Rider Web — lead with the onboarding delta.**
> Two years to build the system. Six weeks to onboard the second agency.

Those measure different things, and the gap is the point: the build bought a platform where adding an agency is a configuration problem, not a development project. No other number here captures that.

❌ Don't lead with page counts. "6 new pages in 1.5 years" or "11 pages in 2 years" reads as three pages a year and buries what the two years actually contained: six months of client requirements and demos, a foundation replacement he had to argue for and win, a payment integration slowed by fraud-prevention rules on fields he couldn't restyle, a configuration layer serving every deployment, localization, and testing — as the only front-end developer on the team.

✅ "5 pages became 11" is fine as a **scope marker** — it shows the product more than doubled. Context, not achievement.

**TOMS — the count works here, because the work was measurable.**
> 55 screens in 2 months.

Screens-per-week is meaningful on TOMS in a way it isn't on Rider Web: there was a spec (the existing screens), no requirements gathering, no client, no design from zero, no new backend. It's translation against known targets. Solo, in a legacy codebase he didn't write, art-directing each screen before generation — that's fast.

But note what changed. At **3 weeks** the number carried the bullet alone. At **2 months** it's roughly a screen a day, which is strong but no longer self-evidently remarkable — so the bullet has to land on the **judgment**: art-directed before generation, reviewed and corrected every screen. That was always the real claim; the number just used to do the work for it.

### Metrics that need a source
70,000 registered riders, 5,000 daily, $5.5M in fares are strong — but they only read as credible if the case study carries them too. A number that appears on LinkedIn and nowhere else looks like a number someone made up.

---

## 8. Open items

1. **The case study is the outdated document.** It says eighteen months, four months of design, three years unsupported, and dates the work 2024–2025 — all superseded. Canonical is **2023–2025, two years**. It also implies design was a phase before the build, which is wrong. Fix first; everything else points at it.

2. **Add the scale metrics to the case study.** 70,000 registered riders, 5,000 daily, $5.5M in fares. They currently live only in the README and LinkedIn, which is why they read as unsupported. Once they're in the case study, all three artifacts agree.

3. **Stale homepage metadata.** `donthephan.com` still serves "Full-Stack Web Developer from Lighthouse Labs." `/case-study/rider-web` serves the Design Engineer version. The root is what shows in search results and link previews.

4. **Remove WCAG claims** from README toolkit and LinkedIn experience section.

5. **Remove "55 screens in 3 weeks"** from README and LinkedIn; replace with 2 months.

6. **Figma component library** — pending. Don't claim until built.

---

## 9. Retired phrasings

| Don't say | Say instead | Why |
|---|---|---|
| "4 years on Rider Web" | "~4 years at Strategic Mapping, 2 on Rider Web" | Started Nov 2022; Rider Web was 2023–2025 |
| "Seven years" / "nine years" before software | "Eight years" | 4 + <1 + 3 |
| "Four months of design, then the build" | "~6 months of requirements and design across the project" | It was interleaved, not sequential |
| "Three years past end of life" | "Two years past end of life" | EOL Dec 2021, project start 2023 |
| "Built from scratch" | "Extended the existing visual language" | Case study makes the opposite point, and the true version is harder |
| "Brought on to expand the platform" | "Assigned to the platform when SunRail arrived" | Implies he was hired for it |
| "CTO brief to Figma to React" | "Client requirements to Figma to React" | He worked directly with SunRail and demoed to them |
| "It shipped largely as-designed" | (cut) | Near-tautological when you're both designer and builder |
| "Rebuilt around progressive disclosure" | Point at auto-load's six states | Generic claim vs. specific evidence |
| "I don't hand-write most implementation anymore" | Scope AI to TOMS | Contradicts the Rider Web narrative |
| "Structured agency differences as backend-supplied configuration" | "Designed the range of screens a configuration can produce" | Config comes from the backend; he owned the front end |
| "6 new pages in 1.5 years" / any page-count-as-achievement | Lead with "2 years to build, 6 weeks to onboard the second agency" | Page counts are scope markers, not achievements — see §7 |
| "55 screens in 3 weeks" | "55 screens in 2 months" | Corrected duration |
| "WCAG 2.1 AA" | (cut) | Rider Web is not fully compliant |
| "Brought the site to accessibility approval" | "Running automated accessibility audits and remediating findings" | Automated scan + AI remediation is a floor, not compliance — see §5 |
| CET Go: "interface and brand design" | "theme and graphics" | Overstates the contribution |

---

## 10. Propagation checklist

When a fact changes here, update:

- [x] Portfolio case study — donthephan.com/case-study/rider-web (2026-08-30: dates, duration, sequencing, and scale metrics corrected in `src/components/CaseStudy/RiderWeb.jsx`, not yet deployed to `main`)
- [ ] Portfolio homepage + metadata
- [ ] LinkedIn — About section
- [ ] LinkedIn — Strategic Mapping experience entry
- [ ] GitHub profile README
- [ ] Design Engineer Resume
