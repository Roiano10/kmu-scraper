import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="border-b border-stone-200 bg-gradient-to-b from-stone-100 to-stone-50 px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-teal-800">
              Switzerland · SME succession
            </p>
            <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl sm:leading-tight">
              Get your company ready for a cleaner exit — starting with how you
              show up online
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-stone-600">
              We help owners strengthen websites, digital channels, and
              measurement so buyers see a business that is easier to
              diligence and less dependent on informal marketing. Our fee is
              tied to your sale: we succeed when you do.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="#contact"
                className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-full bg-teal-800 px-8 text-sm font-medium text-white transition-colors hover:bg-teal-900"
              >
                Talk about your exit
              </a>
              <a
                href="#pricing"
                className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-full border border-stone-300 bg-white px-8 text-sm font-medium text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-50"
              >
                How pricing works
              </a>
            </div>
          </div>
        </section>

        <section
          id="shift"
          className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
              A generational handover — and a digital gap
            </h2>
            <p className="mt-4 text-stone-600">
              Many Swiss SMEs will change hands in the coming years. Buyers
              compare opportunities quickly: they look for clear positioning,
              credible lead flow, and data that holds up in diligence. When
              digital presence is thin or fragmented, the story is harder to
              trust — and the process slows down.
            </p>
            <p className="mt-4 text-stone-600">
              Our thesis is that owners who invest in a coherent online
              footprint and documented performance make it{" "}
              <strong className="font-medium text-stone-800">
                easier to run a competitive sale
              </strong>{" "}
              and support a stronger valuation narrative, subject to sector,
              timing, and fundamentals.
            </p>
          </div>
        </section>

        <section
          id="why"
          className="border-y border-stone-200 bg-white px-4 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
              Why digital readiness shows up in a sale
            </h2>
            <p className="mt-3 max-w-3xl text-stone-600">
              Buyers are not only buying revenue — they are buying{" "}
              <span className="font-medium text-stone-800">
                predictability and transferability
              </span>
              .
            </p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "Demand you can explain",
                  body: "Clear channels, messaging, and basic funnel metrics help buyers see how demand is generated, not only inherited from the founder.",
                },
                {
                  title: "Less key-person risk",
                  body: "A professional site, CRM hygiene, and repeatable campaigns signal that growth is not locked in one person’s inbox or memory.",
                },
                {
                  title: "Faster diligence",
                  body: "When assets, tags, and reporting are in order, advisors spend less time reconciling stories — which can help timing and competitive tension.",
                },
              ].map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6"
                >
                  <h3 className="font-medium text-stone-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="offer"
          className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
            What we deliver
          </h2>
          <p className="mt-3 max-w-3xl text-stone-600">
            A structured review and implementation roadmap across your digital
            footprint — aligned to how buyers actually evaluate SMEs.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "Channel audit: web, SEO, paid media, social, email, marketplaces where relevant",
              "Online brand and positioning consistency (incl. third-party listings)",
              "Lead capture, CRM, and handover to sales — what exists vs what is documented",
              "Analytics and conversion tracking (e.g. GA4, tags, key events)",
              "E-commerce and checkout flows, if you sell online",
              "Buyer-ready summary: findings, priorities, and evidence pack for advisors",
            ].map((line) => (
              <div
                key={line}
                className="flex gap-3 rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-800"
                  aria-hidden
                >
                  ✓
                </span>
                <p className="text-sm leading-relaxed text-stone-700">{line}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-stone-200 bg-stone-100/80 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
              How it works
            </h2>
            <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Discover",
                  text: "Scope, timeline, and access. We align on exit horizon and what “ready” means for your business.",
                },
                {
                  step: "2",
                  title: "Assess",
                  text: "We map channels, assets, and data — and highlight gaps that show up in buyer conversations.",
                },
                {
                  step: "3",
                  title: "Improve",
                  text: "Prioritized fixes and builds: quick wins first, then structural improvements with clear owners.",
                },
                {
                  step: "4",
                  title: "Package",
                  text: "You receive a concise narrative plus evidence for advisors — so diligence is smoother, not noisier.",
                },
              ].map((item) => (
                <li key={item.step}>
                  <span className="text-sm font-bold text-teal-800">
                    Step {item.step}
                  </span>
                  <h3 className="mt-1 font-medium text-stone-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {item.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="pricing"
          className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
            Pricing aligned with your exit
          </h2>
          <p className="mt-3 max-w-3xl text-stone-600">
            We charge a{" "}
            <strong className="font-medium text-stone-800">
              success fee as a percentage of the final sale price
            </strong>
            , typically discussed in the{" "}
            <strong className="font-medium text-stone-800">low single digits</strong>{" "}
            (often around <strong className="font-medium text-stone-800">2–5%</strong>
            ), depending on scope and complexity. You pay from proceeds, not from
            upfront cash flow — so incentives stay aligned with a real
            transaction.
          </p>
          <div className="mt-8 rounded-2xl border border-teal-200 bg-teal-50/50 p-6 sm:p-8">
            <h3 className="font-medium text-stone-900">
              Outcome expectations
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">
              We work toward a sale that is{" "}
              <strong className="font-medium text-stone-900">easier to execute</strong>{" "}
              (clearer story, fewer friction points in diligence) and a
              valuation narrative supported by documented demand and digital
              hygiene. Many teams aim for a{" "}
              <strong className="font-medium text-stone-900">
                meaningful uplift
              </strong>{" "}
              versus an unprepared baseline;{" "}
              <strong className="font-medium text-stone-900">
                individual results vary
              </strong>{" "}
              by sector, timing, and company fundamentals. Nothing here is a
              guarantee of a specific price or multiple.
            </p>
          </div>
        </section>

        <section className="border-y border-stone-200 bg-white px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
              Who this is for
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-800">
                  Good fit
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-stone-600">
                  <li>• Swiss SME planning an exit in the next few years</li>
                  <li>• Willing to invest time in data and channel cleanup</li>
                  <li>• Open to working alongside M&A advisors and tax counsel</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                  Less of a fit
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-stone-600">
                  <li>• Pure turnaround or distress without a plausible sale path</li>
                  <li>• Expecting only tactical ads with no strategic or measurement work</li>
                  <li>• No access to analytics, hosting, or ad accounts for review</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
            FAQ
          </h2>
          <dl className="mt-10 space-y-8">
            {[
              {
                q: "Do you broker or sell the company?",
                a: "No. We focus on digital readiness and evidence. You work with your M&A advisor or broker for the transaction itself.",
              },
              {
                q: "How is the success fee calculated?",
                a: "Typically as a percentage of the agreed sale price at closing, subject to contract. Earn-outs, asset deals, and structure matter — we define this clearly before work starts.",
              },
              {
                q: "What if the sale does not happen?",
                a: "Terms depend on the engagement model. Many success-fee structures include a defined horizon or fallback; we agree this upfront so expectations are explicit.",
              },
              {
                q: "Is the uplift percentage guaranteed?",
                a: "No. Valuation depends on many factors beyond digital. We help you present a clearer, better-supported story to buyers — outcomes still vary.",
              },
            ].map((item) => (
              <div key={item.q}>
                <dt className="font-medium text-stone-900">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-stone-600">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          id="contact"
          className="border-t border-stone-200 bg-gradient-to-b from-teal-900 to-teal-950 px-4 py-20 sm:px-6"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Start with a short conversation
            </h2>
            <p className="mt-4 text-teal-100">
              Share your sector, rough size, and exit horizon. We will reply with
              whether there is a fit and what a first phase could look like.
            </p>
            <a
              href="mailto:hello@example.com?subject=Nachfolge%20Ready%20—%20intro"
              className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-teal-900 transition-colors hover:bg-teal-50"
            >
              Email hello@example.com
            </a>
            <p className="mt-6 text-xs text-teal-200/90">
              Replace the email address in the codebase before you go live.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
