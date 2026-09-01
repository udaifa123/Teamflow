"use client";

import Link from "next/link";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

/* ─── Palette ───────────────────────────────────────────
  Void        #080B14   primary dark ground
  Panel       #10152A   elevated dark surface
  Parchment   #F7F4EC   light ground
  Ink         #13172A   text on light
  Brass       #C9A227   primary accent (metal, warm)
  Signal      #5B8DEF   secondary accent (glow, cool)
────────────────────────────────────────────────────────── */

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen bg-[#F7F4EC] text-[#13172A]`}
      style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
    >
      {/* ── Nav ─────────────────────────────────────────── */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "border-b border-black/[0.06] bg-[#F7F4EC]/90 backdrop-blur-xl"
            : "border-b border-white/0 bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2.5">
              <IsoMark />
              <span
                className={`text-[16px] font-semibold tracking-tight transition-colors ${
                  isScrolled ? "text-[#13172A]" : "text-white"
                }`}
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                TeamFlow
              </span>
            </div>

            <nav className="hidden items-center gap-8 md:flex">
              {["Features", "How it works", "Pricing", "Testimonials"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`text-[13.5px] font-medium transition-colors hover:text-[#C9A227] ${
                    isScrolled ? "text-[#5B6270]" : "text-white/70"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

         <div className="flex gap-3">
  <Link
    href="/login"
    className="px-5 py-2 text-sm font-semibold text-[#13172A] border border-black/10 rounded-full hover:border-[#C9A227]"
  >
    Login
  </Link>

  <Link
    href="/register"
    className="px-5 py-2 text-sm font-semibold text-white bg-[#13172A] rounded-full hover:bg-[#000]"
  >
    Register
  </Link>
</div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#080B14] pb-32 pt-40 lg:pt-48">
        <HeroAtmosphere />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid gap-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5B8DEF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5B8DEF]" />
                </span>
                <span
                  className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-white/55"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  Now shipping — dependency mapping
                </span>
              </div>

              <h1
                className="text-[3.1rem] font-medium leading-[1.08] tracking-tight text-white sm:text-[4rem]"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                Work has a shape.
                <br />
                <span className="italic bg-gradient-to-r from-[#F0D77B] via-[#C9A227] to-[#8A6A17] bg-clip-text text-transparent">
                  We help you see it.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-white/50">
                TeamFlow renders every project as a structure you can actually
                look at — tasks stacked by priority, owners mapped to work,
                deadlines rendered before they slip past you.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
               <Link
  href="/register"
  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#E7C766] to-[#B5871F] px-8 py-4 text-[15px] font-semibold text-[#241A05]"
>
  Start building
  <span className="transition-transform group-hover:translate-x-1">→</span>
</Link>
                <Link
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-8 py-4 text-[15px] font-medium text-white/85 backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/[0.07]"
                >
                  See it in motion
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.75 11.17 11.55 9.04A1 1 0 0 0 10 9.87v4.26a1 1 0 0 0 1.55.83l3.2-2.13a1 1 0 0 0 0-1.66Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[
                    { bg: "from-[#E7C766] to-[#B5871F]", text: "JD" },
                    { bg: "from-[#7FA8FF] to-[#3E63C2]", text: "SK" },
                    { bg: "from-[#EDE3CC] to-[#B7AC8C]", text: "AL" },
                    { bg: "from-[#B5871F] to-[#5B4110]", text: "MR" },
                    { bg: "from-[#3E63C2] to-[#1E2E5C]", text: "PN" },
                  ].map((avatar, i) => (
                    <div
                      key={i}
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${avatar.bg} border-2 border-[#080B14] text-[11px] font-bold text-[#13172A] shadow-[0_4px_14px_rgba(0,0,0,0.45)]`}
                    >
                      {avatar.text}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[14.5px] font-semibold text-white/90">Join 2,400+ teams</p>
                  <p className="text-[12.5px] text-white/35">Structuring their work with TeamFlow</p>
                </div>
              </div>
            </div>

            <Stack3D />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#F7F4EC]" />
      </section>

      {/* ── Stats ───────────────────────────────────────── */}
      <section className="relative border-b border-black/[0.06] bg-[#F7F4EC]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {[
              { value: "12K+", label: "Teams using TeamFlow" },
              { value: "94%", label: "Projects shipped on time" },
              { value: "4.9", label: "Average rating, 3K reviews" },
              { value: "50M", label: "Tasks carried to done" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="text-[2.4rem] font-medium tracking-tight text-[#13172A]"
                  style={{
                    fontFamily: "var(--font-display), serif",
                    textShadow: "0 1px 0 rgba(255,255,255,0.6)",
                  }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-[13px] text-[#5B6270]">{stat.label}</p>
                <div className="mx-auto mt-3 h-[2px] w-8 rounded-full bg-gradient-to-r from-[#C9A227] to-[#8A6A17]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────── */}
      <section id="features" className="py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionEyebrow label="Features" />
          <h2
            className="mt-4 max-w-xl text-[2.5rem] font-medium leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Three surfaces. One structure.
          </h2>
          <p className="mt-3 max-w-lg text-[16px] text-[#5B6270]">
            Every project is built from the same three layers — so nothing
            lives only in someone&rsquo;s head.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-3" style={{ perspective: "1400px" }}>
            <FeatureCard
              index="I"
              icon={<HomeIcon />}
              title="Task structuring"
              desc="Projects hold tasks, tasks hold owners, priorities, and dates. Structure that survives someone leaving the room."
            />
            <FeatureCard
              index="II"
              icon={<ClockIcon />}
              title="Deadline radar"
              desc="Overdue and due-today work surfaces on its own — you see risk building before it becomes a missed date."
            />
            <FeatureCard
              index="III"
              icon={<UsersIcon />}
              title="Team sync"
              desc="Managers assign, members update, everyone comments in one place. The status meeting becomes optional."
            />
          </div>
        </div>
      </section>

      {/* ── Showcase — large 3D tilted photo card ───────── */}
      <section className="relative overflow-hidden bg-[#F1ECDF] py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1fr] lg:items-center">
            <div>
              <SectionEyebrow label="Product" />
              <h2
                className="mt-4 text-[2.5rem] font-medium leading-[1.1] tracking-tight"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                Not a mockup.
                <br />
                <span className="italic bg-gradient-to-r from-[#F0D77B] via-[#C9A227] to-[#8A6A17] bg-clip-text text-transparent">
                  The real thing.
                </span>
              </h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-[#5B6270]">
                Every board, every card, every ring you see is the live
                product — the same screen your team opens every morning,
                rendered exactly as it runs.
              </p>
              <Link
                href="/dashboard"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#13172A] px-7 py-3.5 text-[14.5px] font-semibold text-white transition-all hover:-translate-y-[1px] hover:shadow-[0_16px_32px_-12px_rgba(19,23,42,0.5)]"
              >
                Explore the product
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <ShowcasePhoto3D />
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────── */}
      <section id="how-it-works" className="relative overflow-hidden bg-[#0E1425] py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 15% 0%, rgba(201,162,39,0.10), transparent), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(91,141,239,0.12), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
          <SectionEyebrow label="How it works" dark />
          <h2
            className="mt-4 max-w-xl text-[2.5rem] font-medium leading-[1.1] tracking-tight text-white"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Three moves to a running project.
          </h2>

          <div className="relative mt-16 grid gap-8 md:grid-cols-3">
            <div className="absolute left-[16.5%] right-[16.5%] top-[38px] hidden h-px bg-gradient-to-r from-[#C9A227]/40 via-white/10 to-[#5B8DEF]/40 md:block" />
            <StepCard number="01" title="Create a project" desc="Set a name, a timeline, a status. That's the container everything else lives inside." />
            <StepCard number="02" title="Break it into tasks" desc="Give each task an owner, a priority, a due date. It shows up on their board instantly." />
            <StepCard number="03" title="Watch it move" desc="Progress, overdue work, and stats update live as the team changes task status." />
          </div>
        </div>
      </section>

      {/* ── Photo strip — every team, one structure ─────── */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionEyebrow label="Who it's for" />
          <h2
            className="mt-4 max-w-xl text-[2.5rem] font-medium leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Every kind of team, one shared structure.
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3" style={{ perspective: "1400px" }}>
            <PhotoTiltCard
              src="https://i.pinimg.com/736x/90/e4/93/90e493d59d0c85335d06551a6d136c2b.jpg"
              tag="Engineering"
              caption="Sprints, dependencies, and code review — mapped to the same board."
            />
            <PhotoTiltCard
              src="https://i.pinimg.com/736x/26/a5/50/26a5503fa91f4c1513c27e2198661263.jpg"
              tag="Design"
              caption="Reviews, feedback, and handoff, tracked without a separate tool."
            />
            <PhotoTiltCard
              src="https://i.pinimg.com/1200x/c9/c7/c0/c9c7c0fd405757877e79414216e66dc6.jpg"
              tag="Operations"
              caption="Every recurring process, structured once and run on repeat."
            />
          </div>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────── */}
      <section id="pricing" className="py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionEyebrow label="Pricing" />
          <h2
            className="mt-4 max-w-xl text-[2.5rem] font-medium leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Priced like a tool, not a toy.
          </h2>
          <p className="mt-3 max-w-lg text-[16px] text-[#5B6270]">
            Start free. Move up when the team outgrows the room.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <PricingCard name="Starter" price="$0" period="forever" features={["5 projects", "10 team members", "Basic reporting", "Community support"]} cta="Get started" popular={false} />
            <PricingCard name="Pro" price="$12" period="per user / month" features={["Unlimited projects", "50 team members", "Advanced reporting", "Priority support", "Custom fields"]} cta="Start trial" popular={true} />
            <PricingCard name="Enterprise" price="Custom" period="tailored for you" features={["Unlimited everything", "SSO & SAML", "Dedicated support", "Custom integrations", "SLA guarantee"]} cta="Contact sales" popular={false} />
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────── */}
      <section id="testimonials" className="border-y border-black/[0.06] bg-[#F1ECDF] py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <SectionEyebrow label="Testimonials" />
          <h2
            className="mt-4 max-w-xl text-[2.5rem] font-medium leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Said by the people doing the work.
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <TestimonialCard quote="TeamFlow changed how our team collaborates. We cut meeting time by 40% and shipped faster the same month." name="Priya Nair" role="Engineering Manager" company="TechCorp" photo="https://picsum.photos/seed/teamflow-priya/160/160" />
            <TestimonialCard quote="The best project tool we've used. It's quiet, it's precise, and it actually makes the work feel organized." name="Arjun Singh" role="Product Director" company="DesignStudio" photo="https://picsum.photos/seed/teamflow-arjun/160/160" />
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#080B14] py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 45% 70% at 85% 30%, rgba(201,162,39,0.14), transparent), radial-gradient(ellipse 40% 60% at 5% 100%, rgba(91,141,239,0.14), transparent)",
          }}
        />
        <div className="pointer-events-none absolute top-20 left-1/3 h-px w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-9 px-6 sm:px-10 md:flex-row">
          <div className="text-center md:text-left">
            <h2
              className="text-[2.5rem] font-medium leading-[1.1] tracking-tight text-white"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Ready to give it shape?
            </h2>
            <p className="mt-2 text-[16px] text-white/45">
              Join thousands of teams already building with TeamFlow.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-b from-[#E7C766] to-[#B5871F] px-8 py-4 text-[15px] font-semibold text-[#241A05] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_16px_36px_-10px_rgba(201,162,39,0.75)] transition-all hover:-translate-y-[1px]"
            >
              Start free trial
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href="#features" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-[15px] font-medium text-white/85 transition-all hover:bg-white/[0.08]">
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="bg-[#F7F4EC]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
          <div className="grid gap-12 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5">
                <IsoMark />
                <span className="text-[16px] font-semibold tracking-tight" style={{ fontFamily: "var(--font-display), serif" }}>
                  TeamFlow
                </span>
              </div>
              <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-[#5B6270]">
                The project platform that gives scattered work a structure
                everyone on the team can actually see.
              </p>
              <div className="mt-6 flex gap-3">
                {["Twitter", "LinkedIn", "GitHub", "YouTube"].map((social) => (
                  <Link key={social} href="#" className="text-[#5B6270] transition-colors hover:text-[#C9A227]">
                    <span className="sr-only">{social}</span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-[12px] transition-all hover:border-[#C9A227]">
                      {social[0]}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {[
              { title: "Product", items: ["Features", "Pricing", "Integrations", "Changelog"] },
              { title: "Company", items: ["About", "Blog", "Careers", "Contact"] },
              { title: "Legal", items: ["Privacy", "Terms", "Security", "Cookies"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-[#8B8D7A]" style={{ fontFamily: "var(--font-mono), monospace" }}>
                  {col.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.items.map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-[14px] text-[#5B6270] transition-colors hover:text-[#C9A227]">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t border-black/[0.06] pt-8 text-center text-[13px] text-[#8B8D7A]">
            © 2026 TeamFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ─── Section eyebrow label ─────────────────────────── */
function SectionEyebrow({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="h-[6px] w-[6px] rounded-full bg-gradient-to-br from-[#E7C766] to-[#8A6A17]" />
      <span
        className={`text-[11.5px] font-medium uppercase tracking-[0.16em] ${dark ? "text-white/45" : "text-[#8B8D7A]"}`}
        style={{ fontFamily: "var(--font-mono), monospace" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── Isometric cube logo mark ──────────────────────── */
function IsoMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" className="drop-shadow-[0_3px_6px_rgba(201,162,39,0.35)]">
      <defs>
        <linearGradient id="faceTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F2DC96" />
          <stop offset="100%" stopColor="#D8B646" />
        </linearGradient>
        <linearGradient id="faceLeft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B5871F" />
          <stop offset="100%" stopColor="#8A6A17" />
        </linearGradient>
        <linearGradient id="faceRight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5B8DEF" />
          <stop offset="100%" stopColor="#3E63C2" />
        </linearGradient>
      </defs>
      <polygon points="16,2 29,9 16,16 3,9" fill="url(#faceTop)" />
      <polygon points="3,9 16,16 16,30 3,23" fill="url(#faceLeft)" />
      <polygon points="29,9 16,16 16,30 29,23" fill="url(#faceRight)" />
    </svg>
  );
}

/* ─── Hero ambient light / floor grid ───────────────── */
function HeroAtmosphere() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 30% -10%, rgba(201,162,39,0.16), transparent 60%), radial-gradient(ellipse 55% 45% at 90% 20%, rgba(91,141,239,0.14), transparent 60%)",
        }}
      />
      <div className="pointer-events-none absolute -top-32 right-[-8%] h-[520px] w-[520px] rounded-full bg-[#C9A227]/[0.10] blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-6%] h-[420px] w-[420px] rounded-full bg-[#5B8DEF]/[0.10] blur-[120px]" />
      {/* faint isometric floor grid, grounds the stack in space */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[900px] -translate-x-1/2 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          transform: "perspective(600px) rotateX(62deg)",
          maskImage: "linear-gradient(to top, black, transparent 75%)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent 75%)",
        }}
      />
    </>
  );
}

/* ─── Signature element: The Stack ──────────────────────
   Three glass panels layered in true 3D space, catching
   brass and signal-blue rim light, parallaxing with the
   cursor. Represents Projects → Tasks → People.
──────────────────────────────────────────────────────── */
function Stack3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: -6, y: 10 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 12 - 6, y: px * 16 + 10 });
  };
  const handleLeave = () => setTilt({ x: -6, y: 10 });

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative mx-auto h-[440px] max-w-[520px]"
      style={{ perspective: "1600px" }}
    >
      <div
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 260ms ease-out",
        }}
      >
        {/* Back layer — Overview */}
        <GlassPanel
          z={0}
          x={-6}
          y={18}
          w={420}
          h={230}
          className="left-1/2 top-6 -translate-x-1/2"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35" style={{ fontFamily: "var(--font-mono), monospace" }}>
            Overview
          </p>
          <div className="mt-3 space-y-2.5">
            {[
              { name: "Website redesign", pct: 72 },
              { name: "Mobile app v2", pct: 41 },
              { name: "Q3 marketing site", pct: 90 },
            ].map((row) => (
              <div key={row.name}>
                <div className="flex items-center justify-between text-[11px] text-white/60">
                  <span>{row.name}</span>
                  <span style={{ fontFamily: "var(--font-mono), monospace" }}>{row.pct}%</span>
                </div>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#E7C766] to-[#8A6A17]"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Middle layer — Task cluster */}
        <GlassPanel
          z={70}
          x={16}
          y={-14}
          w={300}
          h={168}
          className="left-8 top-40 sm:left-16"
          accent="brass"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35" style={{ fontFamily: "var(--font-mono), monospace" }}>
            In progress
          </p>
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <p className="text-[12.5px] font-medium text-white/90">API rate limiting</p>
            <p className="mt-1 text-[11px] text-white/40">Due Thursday</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="rounded-full bg-[#C9A227]/20 px-2 py-0.5 text-[9.5px] font-semibold text-[#F0D77B]">HIGH</span>
              <div className="flex -space-x-1.5">
                <div className="h-5 w-5 rounded-full border border-[#10152A] bg-gradient-to-br from-[#E7C766] to-[#B5871F]" />
                <div className="h-5 w-5 rounded-full border border-[#10152A] bg-gradient-to-br from-[#7FA8FF] to-[#3E63C2]" />
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Front layer — Sprint ring */}
        <GlassPanel
          z={150}
          x={-10}
          y={-30}
          w={198}
          h={150}
          className="right-2 top-0 sm:right-[-14px]"
          accent="signal"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35" style={{ fontFamily: "var(--font-mono), monospace" }}>
            Sprint
          </p>
          <div className="mt-3 flex items-center gap-3">
            <svg width="52" height="52" viewBox="0 0 52 52">
              <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
              <circle
                cx="26"
                cy="26"
                r="22"
                fill="none"
                stroke="url(#ringGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 22 * 0.72} ${2 * Math.PI * 22}`}
                transform="rotate(-90 26 26)"
              />
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7FA8FF" />
                  <stop offset="100%" stopColor="#3E63C2" />
                </linearGradient>
              </defs>
            </svg>
            <div>
              <p className="text-[18px] font-semibold text-white" style={{ fontFamily: "var(--font-display), serif" }}>72%</p>
              <p className="text-[10.5px] text-white/40">complete</p>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}

function GlassPanel({
  children,
  z,
  x,
  y,
  w,
  h,
  className = "",
  accent,
}: {
  children: React.ReactNode;
  z: number;
  x: number;
  y: number;
  w: number;
  h: number;
  className?: string;
  accent?: "brass" | "signal";
}) {
  const ring =
    accent === "brass"
      ? "shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_24px_50px_-16px_rgba(201,162,39,0.35),0_0_0_1px_rgba(201,162,39,0.18)]"
      : accent === "signal"
      ? "shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_24px_50px_-16px_rgba(91,141,239,0.4),0_0_0_1px_rgba(91,141,239,0.22)]"
      : "shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_30px_60px_-20px_rgba(0,0,0,0.6)]";

  return (
    <div
      className={`absolute rounded-2xl border border-white/[0.08] bg-[#10152A]/80 p-5 backdrop-blur-xl ${ring} ${className}`}
      style={{
        width: w,
        height: h,
        transform: `translateZ(${z}px) translateX(${x}px) translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Feature card — subtle 3D tilt on hover ────────── */
function FeatureCard({ icon, title, desc, index }: { icon: React.ReactNode; title: string; desc: string; index: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -7, y: px * 7 });
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${
          tilt.x !== 0 || tilt.y !== 0 ? -4 : 0
        }px)`,
        transition: "transform 220ms ease-out",
      }}
      className="group relative rounded-2xl border border-black/[0.07] bg-white p-8 shadow-[0_2px_10px_rgba(19,23,42,0.05)] hover:shadow-[0_30px_60px_-24px_rgba(201,162,39,0.3)]"
    >
      <span
        className="absolute right-6 top-6 text-[13px] font-medium text-black/15"
        style={{ fontFamily: "var(--font-mono), monospace" }}
      >
        {index}
      </span>
      <div style={{ transform: "translateZ(24px)" }}>
        <div className="mb-6 flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-gradient-to-br from-[#F7EFD8] to-[#EDE0B8] text-[#8A6A17] shadow-[0_8px_18px_-8px_rgba(201,162,39,0.5)] transition-transform group-hover:scale-110">
          {icon}
        </div>
        <h3 className="text-[18px] font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-[#5B6270]">{desc}</p>
      </div>
    </div>
  );
}

/* ─── Step card ──────────────────────────────────────── */
function StepCard({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center backdrop-blur-sm transition-all hover:bg-white/[0.05]">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-[#E7C766] to-[#B5871F] text-[12px] font-bold text-[#241A05] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_10px_20px_-6px_rgba(201,162,39,0.6)]"
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          {number}
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-[18px] font-semibold tracking-tight text-white">{title}</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-white/45">{desc}</p>
      </div>
    </div>
  );
}

/* ─── Pricing card ───────────────────────────────────── */
function PricingCard({
  name,
  price,
  period,
  features,
  cta,
  popular,
}: {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  popular: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl border p-8 transition-all duration-300 ${
        popular
          ? "border-[#C9A227]/40 bg-[#13172A] text-white shadow-[0_40px_70px_-24px_rgba(201,162,39,0.4)] lg:-translate-y-3"
          : "border-black/[0.08] bg-white hover:-translate-y-1 hover:shadow-lg"
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-block rounded-full bg-gradient-to-b from-[#E7C766] to-[#B5871F] px-4 py-1 text-[11px] font-bold text-[#241A05] shadow-lg">
            Most popular
          </span>
        </div>
      )}
      <div className="mt-2 text-center">
        <h3 className={`text-[18px] font-semibold ${popular ? "text-white" : "text-[#13172A]"}`}>{name}</h3>
        <div className="mt-3 flex items-baseline justify-center gap-1">
          <span
            className={`text-[40px] font-medium tracking-tight ${popular ? "text-white" : "text-[#13172A]"}`}
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            {price}
          </span>
          <span className={`text-[13px] ${popular ? "text-white/40" : "text-[#8B8D7A]"}`}>/{period}</span>
        </div>
      </div>
      <ul className="mt-8 space-y-3">
        {features.map((feature) => (
          <li key={feature} className={`flex items-center gap-3 text-[14px] ${popular ? "text-white/70" : "text-[#5B6270]"}`}>
            <svg className="h-4 w-4 shrink-0 text-[#C9A227]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href="#"
        className={`mt-8 block w-full rounded-full py-3.5 text-center text-[14px] font-semibold transition-all ${
          popular
            ? "bg-gradient-to-b from-[#E7C766] to-[#B5871F] text-[#241A05] hover:shadow-lg hover:shadow-[#C9A227]/30"
            : "border border-black/10 bg-white text-[#13172A] hover:border-[#C9A227] hover:text-[#8A6A17]"
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}

/* ─── Testimonial card ───────────────────────────────── */
function TestimonialCard({ quote, name, role, company, photo }: { quote: string; name: string; role: string; company: string; photo: string }) {
  return (
    <div className="rounded-2xl border border-black/[0.07] bg-white p-8 shadow-[0_2px_10px_rgba(19,23,42,0.05)] transition-all hover:shadow-lg">
      <div className="mb-4 flex gap-0.5 text-[#C9A227]">{"★★★★★"}</div>
      <p className="text-[16px] leading-relaxed text-[#3A3F4E]" style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic", fontWeight: 400 }}>
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-4">
      <Image
  src={photo}
  alt={name}
  width={44}
  height={44}
  className="h-11 w-11 rounded-full object-cover ring-2 ring-[#C9A227]/30"
/>
        <div>
          <p className="text-[14.5px] font-semibold text-[#13172A]">{name}</p>
          <p className="text-[12.5px] text-[#8B8D7A]">{role} · {company}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Showcase photo — large tilted 3D glass frame ──── */
function ShowcasePhoto3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: -4, y: -8 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 10 - 4, y: px * 14 - 8 });
  };
  const handleLeave = () => setTilt({ x: -4, y: -8 });

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative mx-auto max-w-[520px]"
      style={{ perspective: "1600px" }}
    >
      <div className="absolute -inset-10 rounded-[40px] bg-gradient-to-br from-[#C9A227]/25 via-[#5B8DEF]/10 to-transparent blur-3xl" />

      <div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 260ms ease-out",
        }}
      >
        <div className="relative overflow-hidden rounded-[22px] border border-white/10 shadow-[0_50px_90px_-30px_rgba(19,23,42,0.55)]">
        <Image
  src="https://i.pinimg.com/736x/2a/05/2c/2a052c201080c1886779acc0e5dd4ec5.jpg"
  alt="TeamFlow running on a team's shared board"
  width={1100}
  height={900}
  className="h-[800px] w-700 object-cover"
/>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080B14]/70 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
            <span
              className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md"
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              Live board · updated 2m ago
            </span>
          </div>
        </div>

        <div
          className="absolute -left-8 -top-6 z-20 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/95 px-4 py-3 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          style={{ transform: "translateZ(80px)" }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F7EFD8] text-[#8A6A17]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-[12px] font-bold leading-none text-[#13172A]">98%</p>
            <p className="mt-1 text-[10px] leading-none text-[#8B8D7A]">On-time delivery</p>
          </div>
        </div>

        <div
          className="absolute -bottom-6 -right-6 z-20 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/95 px-4 py-3 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          style={{ transform: "translateZ(100px)" }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8EFFE] text-[#3E63C2]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="9" cy="8" r="3.2" />
              <path d="M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5" />
            </svg>
          </div>
          <div>
            <p className="text-[12px] font-bold leading-none text-[#13172A]">4 members</p>
            <p className="mt-1 text-[10px] leading-none text-[#8B8D7A]">Active on sprint</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Photo tilt card — used in the team-type strip ─── */
function PhotoTiltCard({ src, tag, caption }: { src: string; tag: string; caption: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 6 });
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${
          tilt.x !== 0 || tilt.y !== 0 ? -6 : 0
        }px)`,
        transition: "transform 220ms ease-out",
      }}
      className="group relative overflow-hidden rounded-2xl border border-black/[0.07] shadow-[0_2px_10px_rgba(19,23,42,0.06)] hover:shadow-[0_36px_60px_-20px_rgba(19,23,42,0.3)]"
    >
<Image
  src={src}
  alt={tag}
  width={700}
  height={860}
  className="h-[340px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
/>      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080B14]/85 via-[#080B14]/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <span
          className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10.5px] font-medium uppercase tracking-[0.1em] text-white backdrop-blur-md"
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          {tag}
        </span>
        <p className="mt-3 text-[14px] leading-relaxed text-white/85">{caption}</p>
      </div>
    </div>
  );
}

/* ─── Icons ──────────────────────────────────────────── */
function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 3.2" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5" />
      <circle cx="17.5" cy="8.5" r="2.4" />
      <path d="M16 14.6c2.5.4 4.3 2.2 4.8 5" />
    </svg>
  );
}