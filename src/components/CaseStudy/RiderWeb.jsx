import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TailwindContext from '../store/tailwind-context';

// Rendered as static images rather than live-highlighted markup — the JS
// syntax highlighter this replaced was verifiably correct (checked its
// output down to React's own fiber tree) but rendered as invisible/broken
// text in the wild regardless, for reasons that pointed at a corrupted
// browser-level cache rather than anything fixable in this file. A plain
// screenshot has no such failure mode. Real production config for both
// agencies, with two fields redacted: `baseUrl` to an `.example` domain
// (IANA-reserved for docs/placeholders, so it reads as obviously
// illustrative rather than a real address), and SunRail's
// `googleAnalyticsId` to an all-X placeholder in the same "G-XXXXXXXXXX"
// shape as a real GA4 measurement id. `scope` is left real: it's an
// internal tenant key, not a resolvable address.
const CodeImage = ({ label, src, alt }) => (
  <div className='flex flex-col gap-2'>
    <p className='text-sm font-bold uppercase tracking-wide text-text/60'>
      {label}
    </p>
    <img
      src={src}
      alt={alt}
      className='w-full rounded-xl border border-bg-base-3/10'
    />
  </div>
);

const AUTO_LOAD_STATES = [
  'Disabled by config',
  'Enabled, no payment method',
  'Payment method connected',
  'Toggled on',
  'Toggled on, unsaved',
  'Saved',
];

const Divider = () => <div className='divider my-10 w-full' />;

const Section = ({ title, children }) => (
  <section>
    <h2 className='text-2xl md:text-3xl font-bold mb-4'>{title}</h2>
    <div className='flex flex-col gap-4 text-lg leading-relaxed'>
      {children}
    </div>
  </section>
);

const ImagePlaceholder = ({ label, className = '' }) => (
  <div
    className={`flex flex-col items-center justify-center gap-2 min-h-48 rounded-xl border-2 border-dashed border-text/25 bg-bg-base-2/60 p-6 text-center ${className}`}
  >
    <i className='fa-solid fa-image text-3xl text-text/40' aria-hidden='true' />
    <p className='text-sm italic text-text/50'>{label}</p>
  </div>
);

// Real (non-placeholder) images open fullscreen on click rather than just
// linking to the raw file — `onOpen` is wired to a single piece of state
// lifted to the page so only one lightbox instance exists no matter how
// many images the page grows to.
const ClickableImage = ({ src, alt, className = '', onOpen }) => (
  <img
    src={src}
    alt={alt}
    onClick={() => onOpen({ src, alt })}
    className={`cursor-zoom-in ${className}`}
  />
);

// Same label-above-media shape as CodeImage, but for real screenshots
// rather than the dark JSON blocks — light border/shadow to match the
// hero and Figma-library images elsewhere on the page, and click-to-zoom
// since these are photographic content worth seeing at full size.
const LabeledScreenshot = ({ label, src, alt, onOpen }) => (
  <div className='flex flex-col gap-2'>
    <p className='text-sm font-bold uppercase tracking-wide text-text/60'>
      {label}
    </p>
    <ClickableImage
      src={src}
      alt={alt}
      className='w-full rounded-xl border border-text/10 drop-shadow-xl'
      onOpen={onOpen}
    />
  </div>
);

const LIGHTBOX_TRANSITION_MS = 200;

const Lightbox = ({ image, onClose }) => {
  // `rendered` lags one step behind `image` on close, so the overlay stays
  // mounted (and the image src stays put) through the closing transition
  // instead of vanishing the instant the parent nulls the state out.
  const [rendered, setRendered] = useState(image);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (image) {
      setRendered(image);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    const timeout = setTimeout(() => setRendered(null), LIGHTBOX_TRANSITION_MS);
    return () => clearTimeout(timeout);
  }, [image]);

  useEffect(() => {
    if (!rendered) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [rendered, onClose]);

  if (!rendered) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-text/90 p-6 transition-opacity duration-200 ease-out ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <button
        type='button'
        onClick={onClose}
        aria-label='Close'
        className='fixed top-6 right-6 flex items-center justify-center w-12 h-12 rounded-full border border-bg-base-3 text-bg-base-3 text-xl hover:bg-bg-base-3 hover:text-text duration-150'
      >
        <i className='fa-solid fa-xmark' aria-hidden='true' />
      </button>
      <img
        src={rendered.src}
        alt={rendered.alt}
        onClick={(e) => e.stopPropagation()}
        className={`max-w-full max-h-full object-contain rounded-lg cursor-default transition-transform duration-200 ease-out ${
          visible ? 'scale-100' : 'scale-90'
        }`}
      />
    </div>
  );
};

function RiderWeb() {
  const { h1Size, sectionPaddingX, sectionPaddingY } =
    useContext(TailwindContext);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Arriving here is a route change from a Card that can sit far down the
  // home page's scroll — without this the page can open mid-scroll instead
  // of at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = 'Rider Web — Case Study | Donny Phan';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <article className={`w-full ${sectionPaddingX} ${sectionPaddingY} lg:text-lg`}>
      <Link
        to='/'
        className='inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide underline underline-offset-2 hover:text-text/60 duration-150 mb-8'
      >
        <i className='fa-solid fa-arrow-left' aria-hidden='true' />
        Back to portfolio
      </Link>

      <header className='mb-10 flex flex-col gap-4'>
        <h1 className={h1Size}>Rider Web</h1>
        <p className='text-sm sm:text-base font-bold uppercase tracking-wide text-text/70 -mt-4'>
          Design Engineer · Strategic Mapping · 2023–2025 ·{' '}
          <a
            href='https://sunrail-account.transitsherpa.com/'
            target='_blank'
            rel='noopener noreferrer'
            className='underline underline-offset-2 hover:text-text normal-case'
          >
            sunrail-account.transitsherpa.com
          </a>
        </p>
        <p className='text-lg leading-relaxed'>
          SunRail needed a fare-collection portal. We had a mobile-ticketing
          companion. I was the only frontend developer, and the platform
          we'd have built it on had reached end of life — so I argued for
          rebuilding the foundation in React, then designed and built the
          new product on it, working directly with SunRail through six
          months of requirements and product demos. Five pages became
          eleven. Two years to build the system; six weeks to onboard the
          second agency.
        </p>
      </header>

      <ClickableImage
        src='/images/case-study/rider-web/hero.webp'
        alt='SunRail Rider Web sign-in and account creation landing screen'
        className='w-full rounded-xl border border-text/10 drop-shadow-xl mb-12'
        onOpen={setLightboxImage}
      />

      <div className='flex flex-col gap-10'>
        <Section title='A different product, not a bigger one'>
          <p>
            Rider Web was our multi-agency platform for transit clients: a
            companion to mobile ticketing, where riders bought a ticket and
            managed an account. Five pages — landing, sign-in recovery, buy
            tickets, my account.
          </p>
          <p>
            SunRail arrived as a new client needing something else: a full
            AFC (Automated Fare Collection) customer website. Automated Fare
            Collection is how an agency takes fares without cash at the
            door, and the rider-facing side of it is a different product
            from a ticketing companion. Their spec included reloadable fare
            cards (SunCards), tap and usage history, auto-replenish, twelve
            months of history for registered and unregistered riders, and
            PDF and Excel export.
          </p>
          <p>
            None of it existed in the platform. This wasn't a bigger version
            of what we had; it was a category change.
          </p>
          <p>
            <span className='font-bold'>Team: </span>
            one frontend developer (me), one full-stack, five backend.
          </p>
        </Section>

        <Divider />

        <Section title='Design and build, in parallel'>
          <p>
            Requirements and design documentation with SunRail ran through
            the whole project — about six months of it, cumulative. It was
            never a phase that finished before the build started: build a
            piece of Rider Web, return to the design docs, update them in
            Figma, build again.
          </p>
          <p>
            The team's client design documents were being assembled in
            PowerPoint — screens built as screenshots, slide by slide. With
            a spec this size and a client iterating this often, every
            revision meant a manual sweep across every slide where an
            element appeared. I proposed Figma and demonstrated it rather
            than arguing for it: components, components nested inside
            components, one edit cascading through every instance. The
            value was visible in a few minutes.
          </p>
          <p>
            That library became the reference for the build — the same
            component boundaries in Figma and later in React.
          </p>
          <ClickableImage
            src='/images/case-study/rider-web/figma-library.webp'
            alt='Figma file showing the Rider Web component library, a typography scale, and a Create Account form built from those components'
            className='w-full rounded-xl border border-text/10 drop-shadow-xl'
            onOpen={setLightboxImage}
          />
        </Section>

        <Divider />

        <Section title='The turn'>
          <p>
            Early on, I spent a week inside the existing AngularJS codebase
            planning the build.
          </p>
          <p>
            State moved badly. It lived in scopes and services rather than
            flowing in one direction, and two-way binding meant a change in
            one place could surface somewhere unrelated. Tracing why a value
            had changed meant reading through much of the app. I was about
            to more than double the page count and add fare collection,
            card management, and payment processing to it — alone.
          </p>
          <p>
            Then I looked at the framework rather than the code. AngularJS
            reached end of life in December 2021 — final release, repository
            archived, no further patches of any kind including security. By
            the time we started, it had been unsupported for about two
            years.
            Rider Web is public-facing software operated by government
            transit agencies, and any vulnerability disclosed from that
            point forward had no official fix.
          </p>
          <p>Building an AFC portal on that foundation was the wrong move twice over.</p>
        </Section>

        <Divider />

        <Section title='The recommendation'>
          <p className='text-xl font-bold'>
            Rebuild in React, then build the new product on the new
            foundation.
          </p>
          <p>
            The objection to any rewrite is cost, and the answer here is
            that a rewrite was already the floor. Moving from AngularJS to
            modern Angular is not an upgrade — the frameworks share a name,
            not an architecture, and the migration is a ground-up rebuild.
            Once a rewrite is unavoidable, the only question is the target.
          </p>
          <p>
            React, for three reasons. Staying meant carrying a permanent
            unpatchable exposure on public software for government clients.
            A rewrite was required regardless of destination, so choosing
            React didn't add one. And my experience was heavily React, so
            there was no ramp — worth naming plainly, because when one
            developer owns the design and the entire frontend, their ramp
            time is a real line on the schedule.
          </p>
          <p>
            Approved. Scope became: replace the foundation, then build the
            AFC product on it.
          </p>
          <p>
            With the rebuild underway I also tightened what the old app had
            left loose: a defined type scale across heading levels and a
            defined spacing system. Tailwind helped by narrowing the
            vocabulary — a fixed set of sizes and steps to choose from, so
            consistency came from constrained options rather than from
            remembering. The components did the rest. A shared pattern is
            styled once where it's defined and inherited everywhere it's
            used, which is the same mechanism the Figma library was already
            giving the design side.
          </p>
        </Section>

        <Divider />

        <Section title='Designing for a configuration, not a screen'>
          <p>
            The platform is multi-agency. We built and proved the new one
            with SunRail, then brought Cascades East Transit onto the same
            system. Agency differences arrive from the backend as a config
            object:
          </p>
          <div className='grid gap-4 sm:grid-cols-2'>
            <CodeImage
              label='SunRail'
              src='/images/case-study/rider-web/sunrail-config.webp'
              alt='SunRail agency config object — NIC payment processor, auto-replenish and one-time payment enabled, all registration fields optional'
            />
            <CodeImage
              label='Cascades East'
              src='/images/case-study/rider-web/cascades-east-config.webp'
              alt='Cascades East Transit agency config object — Braintree payment processor, fare capping enabled, name and mobile required at registration'
            />
          </div>
          <p className='italic font-medium'>
            So I wasn't designing screens. I was designing the range of
            screens a configuration could produce.
          </p>
          <p>
            The account creation page carries this hardest. Two fields are
            fixed for every agency — email and password. Everything else is
            configurable: name, mobile, address, city, state, zip. Each can
            be required, optional, or absent. The
            form has to read as intentional at both ends of that range,
            whether an agency asks for two fields or ten, and it can't look
            like a template with holes in it when they choose the short
            version.
          </p>
          <p>
            Localization cost less than expected, and for a reason worth
            stating: text was soft-coded and the layout sized to content
            rather than to fixed dimensions, so Spanish paragraphs simply
            ran taller and buttons grew to fit. SunRail shipped with an
            English/Spanish toggle in the header and no layout changes.
          </p>
          <div className='grid gap-4 sm:grid-cols-2'>
            <LabeledScreenshot
              label='SunRail'
              src='/images/case-study/rider-web/sunrail-create-account.webp'
              alt='SunRail account creation form, annotated with callouts tying the name and mobile/address/city/state/zip field groups to their optional registrationFields config entries'
              onOpen={setLightboxImage}
            />
            <LabeledScreenshot
              label='Cascades East'
              src='/images/case-study/rider-web/cascades-east-create-account.webp'
              alt='Cascades East Transit account creation form, annotated with callouts tying the name and mobile field groups to their required registrationFields config entries — no address fields present'
              onOpen={setLightboxImage}
            />
          </div>
          <div className='grid gap-4 sm:grid-cols-2'>
            <LabeledScreenshot
              label='SunRail'
              src='/images/case-study/rider-web/sunrail-load-funds.webp'
              alt='SunRail Load Funds screen, annotated with callouts tying the Auto Load section and One Time Payment option to autoReplenish and oneTimePayment enabled in config'
              onOpen={setLightboxImage}
            />
            <LabeledScreenshot
              label='Cascades East'
              src='/images/case-study/rider-web/cascades-east-load-funds.webp'
              alt='Cascades East Transit Load Funds screen with no Auto Load or One Time Payment options present, annotated with a config overlay showing autoReplenish and oneTimePayment both disabled'
              onOpen={setLightboxImage}
            />
          </div>
        </Section>

        <Divider />

        <Section title='The screen that was actually hard: auto-load'>
          <p>
            Auto-load lets a rider set their balance to top up automatically
            below a threshold. It wasn't shipping in phase one, but it had
            to exist in the system ready to switch on — so it went in as a
            flag, and the design had to hold across every state that flag
            creates.
          </p>
          <p>It resolves through a chain of conditions:</p>
          <ul className='list-disc pl-6 flex flex-col gap-2'>
            <li>Feature disabled by config — nothing appears.</li>
            <li>
              Enabled, but no payment method connected — still nothing.
              Auto-load without a card is a dead control, so it doesn't
              exist yet.
            </li>
            <li>Payment method connected — the toggle appears.</li>
            <li>Toggled on — threshold and amount fields expand into view.</li>
            <li>
              Toggled on but never saved — reverts on logout. Session state
              isn't a setting.
            </li>
            <li>Saved — fields stay populated across refresh and re-login.</li>
          </ul>
          <p>
            The save button tracks whether the values differ from what's
            stored: it greys out when they match and activates the moment
            they don't, so the control itself tells the rider whether they
            have unsaved changes. Saving confirms with a notification.
          </p>
          <p>
            Six states, one screen, and most riders will only ever see two
            of them. The work was making sure the ones they land in never
            feel like a fragment of something larger.
          </p>
          <div className='flex gap-3 overflow-x-auto pb-2'>
            {AUTO_LOAD_STATES.map((label) => (
              <div key={label} className='shrink-0 w-40'>
                <ImagePlaceholder label={label} className='min-h-56' />
              </div>
            ))}
          </div>
          <p className='text-sm italic text-text/50'>
            A sequence, not a single screenshot — the most differentiating
            image on the page.
          </p>
          <p>
            <span className='font-bold'>Payment.</span> SunRail had an
            agreement with NIC as their processor, so checkout embeds NIC's
            own card input. Fraud-prevention requirements meant a long
            integration, and the embedded fields came with their own
            appearance — I could only style them within the options NIC
            exposed. The design problem became making a component I didn't
            control sit inside a page I did, without the seam showing.
          </p>
        </Section>

        <Divider />

        <Section title='What stayed'>
          <p>
            SunRail asked for material to be moved and some of it dropped,
            but the theme held. The result reads as the same product
            family: recognizably Rider Web, reorganized, with a great deal
            more in it.
          </p>
          <p>
            That constraint shaped the new work. Six pages that had never
            existed had to feel like they always had, which meant extending
            the existing visual language rather than replacing it — harder
            than a clean slate, not easier.
          </p>
          <div className='grid gap-4 sm:grid-cols-3'>
            {[1, 2, 3].map((n) => (
              <div key={n} className='flex flex-col gap-2'>
                <ImagePlaceholder label={`New screen ${n}`} />
                <p className='text-sm italic text-text/50 text-center'>
                  One-line caption — the problem it solves
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        <Section title='Where it landed'>
          <p>
            <strong>Two years</strong> to build the system, including
            testing. Bringing Cascades East onto the finished platform took{' '}
            <strong>six weeks</strong>.
          </p>
          <p>
            Those aren't measuring the same thing, and that's the point —
            the first two years includes building the system: the
            foundation replacement, the AFC product, the configuration
            layer, testing. The six weeks is what it now costs to add an
            agency. The build bought a platform where onboarding is a
            configuration problem rather than a development project.
          </p>
          <p>
            Rider Web now serves <strong>70,000+</strong> registered riders
            across both agencies, with roughly <strong>5,000</strong>{' '}
            riders using it daily. It has processed <strong>$5.5M</strong>{' '}
            in fares as of June 2026.
          </p>
        </Section>
      </div>

      <Divider />

      <Link
        to='/'
        className='inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide underline underline-offset-2 hover:text-text/60 duration-150'
      >
        <i className='fa-solid fa-arrow-left' aria-hidden='true' />
        Back to portfolio
      </Link>

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </article>
  );
}

export default RiderWeb;
