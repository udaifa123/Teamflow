"use client";

import Link from "next/link";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { useState, useEffect, useRef } from "react";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      className={`${display.variable} ${mono.variable} min-h-screen bg-[#F6FAF9] text-[#0B1D18]`}
      style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
    >
      {/* Top Navigation */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 shadow-[0_1px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl"
            : "bg-white/0 backdrop-blur-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0D9488] to-[#059669] text-sm font-bold text-white shadow-lg shadow-[#0D9488]/25 [transform:perspective(400px)_rotateY(-8deg)]">
                T
              </div>
              <span className={`text-[17px] font-bold tracking-tight transition-colors ${isScrolled ? "text-[#0B1D18]" : "text-white"}`}>
                Team<span className="text-[#2DD4BF]">Flow</span>
              </span>
            </div>

            <nav className="hidden items-center gap-8 md:flex">
              {["Features", "How it works", "Pricing", "Testimonials"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`text-[14px] font-medium transition-colors hover:text-[#2DD4BF] ${
                    isScrolled ? "text-[#4B5B57]" : "text-white/80"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="group inline-flex items-center rounded-full bg-gradient-to-br from-[#0D9488] to-[#059669] px-6 py-2.5 text-[14px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(13,148,136,0.6)] transition-all hover:shadow-[0_12px_32px_-6px_rgba(13,148,136,0.7)] hover:scale-[1.02]"
            >
              Get Started
              <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - deep teal, 3D laptop mockup */}
      <section className="relative overflow-hidden bg-[#04120F] pb-28 pt-40 lg:pt-48">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#0E2B24_0%,#04120F_55%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="pointer-events-none absolute -top-40 right-0 h-[560px] w-[560px] rounded-full bg-[#0D9488]/25 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-[#F0B429]/10 blur-[110px]" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#059669]/15 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2DD4BF] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2DD4BF]" />
                </span>
                <span className="text-[13px] font-medium text-white/70">Available now</span>
                <span
                  className="ml-1 rounded-full bg-gradient-to-r from-[#F0B429] to-[#D97706] px-2 py-0.5 text-[10px] font-bold tracking-wide text-[#1A1200]"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  NEW
                </span>
              </div>

              <h1 className="text-[3.2rem] font-bold leading-[1.08] tracking-tight text-white sm:text-[4rem]">
                Project Management
                <br />
                <span className="bg-gradient-to-r from-[#2DD4BF] via-[#34D399] to-[#F0B429] bg-clip-text text-transparent">
                  That Helps Teams
                </span>
                <br />
                Stay Organised
              </h1>

              <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/55">
                Successful projects start with better planning and collaboration.
                TeamFlow helps businesses organise tasks, manage deadlines, assign
                responsibilities, and track progress — all in one place.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#0D9488] to-[#059669] px-8 py-4 text-[15px] font-medium text-white shadow-[0_12px_30px_-8px_rgba(13,148,136,0.65)] transition-all hover:shadow-[0_18px_40px_-8px_rgba(13,148,136,0.8)] hover:scale-[1.02]"
                >
                  Start free trial
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-8 py-4 text-[15px] font-medium text-white backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/[0.09]"
                >
                  Watch demo
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[
                    { bg: "from-[#0D9488] to-[#059669]", text: "JD" },
                    { bg: "from-[#F59E0B] to-[#F97316]", text: "SK" },
                    { bg: "from-[#10B981] to-[#34D399]", text: "AL" },
                    { bg: "from-[#0EA5A5] to-[#2DD4BF]", text: "MR" },
                    { bg: "from-[#F0B429] to-[#D97706]", text: "PN" },
                  ].map((avatar, i) => (
                    <div
                      key={i}
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${avatar.bg} border-2 border-[#04120F] text-[11px] font-bold text-white shadow-[0_4px_12px_rgba(0,0,0,0.4)]`}
                    >
                      {avatar.text}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-white">Join 2,000+ teams</p>
                  <p className="text-[13px] text-white/40">Trusted by teams worldwide</p>
                </div>
              </div>
            </div>

            {/* 3D laptop mockup with live dashboard "screen" */}
            <div className="relative">
              <LaptopMockup3D />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#F6FAF9]" />
      </section>

      {/* Stats Section */}
      <section className="relative -mt-8 border-y border-[#E1EEEA] bg-white/70 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "12K+", label: "Teams using TeamFlow", icon: "👥" },
              { value: "94%", label: "Project success rate", icon: "📈" },
              { value: "4.9★", label: "Average user rating", icon: "⭐" },
              { value: "50M+", label: "Tasks completed", icon: "✅" },
            ].map((stat) => (
              <div key={stat.label} className="group text-center transition-transform duration-300 hover:-translate-y-1">
                <div className="text-2xl mb-1 transition-transform duration-300 group-hover:scale-110">{stat.icon}</div>
                <p className="text-[2rem] font-bold tracking-tight text-[#0B1D18]">{stat.value}</p>
                <p className="text-[13px] text-[#8B9A96]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - 3D tilt cards */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-[#ECFDF5] px-4 py-1 text-[13px] font-medium text-[#0D9488]">
              Features
            </span>
            <h2 className="mt-4 text-[2.6rem] font-bold tracking-tight">
              Everything you need to ship faster
            </h2>
            <p className="mt-3 text-[17px] text-[#4B5B57]">
              Designed for teams who value clarity and speed. From planning to delivery.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3" style={{ perspective: "1200px" }}>
            <FeatureCard icon={<HomeIcon />} title="Task Organization" desc="Projects hold tasks. Tasks hold owners, priorities, and due dates. No more work living in someone's head." color="#0D9488" />
            <FeatureCard icon={<ClockIcon />} title="Deadline Tracking" desc="Overdue and due-today work surfaces automatically — see risk before it becomes a missed deadline." color="#F0B429" />
            <FeatureCard icon={<UsersIcon />} title="Team Collaboration" desc="Managers assign, members update, everyone comments in the same place. No status-update meetings." color="#10B981" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-[#F6FAF9] py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-[#ECFDF5] px-4 py-1 text-[13px] font-medium text-[#0D9488]">
              How it works
            </span>
            <h2 className="mt-4 text-[2.6rem] font-bold tracking-tight">
              Get started in 3 simple steps
            </h2>
            <p className="mt-3 text-[17px] text-[#4B5B57]">
              From setup to success — your team will be organized in minutes
            </p>
          </div>
          <div className="relative mt-16 grid gap-8 md:grid-cols-3">
            <div className="absolute left-1/3 top-16 hidden h-[2px] w-1/3 bg-gradient-to-r from-[#0D9488]/20 via-[#059669]/20 to-transparent md:block" />
            <StepCard number="01" title="Create a project" desc="Set a name, timeline, and status. That's the container everything else lives in." />
            <StepCard number="02" title="Break it into tasks" desc="Give each task an owner, priority, and due date. Assign it and it shows up on their board." />
            <StepCard number="03" title="Watch it move" desc="Progress, overdue work, and stats update live as the team updates task status." />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-[#ECFDF5] px-4 py-1 text-[13px] font-medium text-[#0D9488]">
              Pricing
            </span>
            <h2 className="mt-4 text-[2.6rem] font-bold tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="mt-3 text-[17px] text-[#4B5B57]">
              Start free, scale as you grow. No hidden fees.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <PricingCard name="Starter" price="$0" period="forever" features={["5 projects", "10 team members", "Basic reporting", "Community support"]} cta="Get Started" popular={false} />
            <PricingCard name="Pro" price="$12" period="per user/month" features={["Unlimited projects", "50 team members", "Advanced reporting", "Priority support", "Custom fields"]} cta="Start Trial" popular={true} />
            <PricingCard name="Enterprise" price="Custom" period="tailored for you" features={["Unlimited everything", "SSO & SAML", "Dedicated support", "Custom integrations", "SLA guarantee"]} cta="Contact Sales" popular={false} />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="bg-[#F6FAF9] py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-[#ECFDF5] px-4 py-1 text-[13px] font-medium text-[#0D9488]">
              Testimonials
            </span>
            <h2 className="mt-4 text-[2.6rem] font-bold tracking-tight">
              Loved by teams everywhere
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <TestimonialCard quote="TeamFlow has completely transformed how our team collaborates. We've cut meeting time by 40% and increased delivery speed." name="Priya Nair" role="Engineering Manager" company="TechCorp" avatar="PN" />
            <TestimonialCard quote="The best project management tool we've ever used. It's intuitive, powerful, and actually makes work feel organized." name="Arjun Singh" role="Product Director" company="DesignStudio" avatar="AS" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#04120F] to-[#0E2B24] py-20">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#0D9488]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#F0B429]/10 blur-3xl" />
        <div className="absolute top-20 left-1/3 h-px w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 sm:px-10 md:flex-row">
          <div className="text-center md:text-left">
            <h2 className="text-[2.6rem] font-bold leading-tight tracking-tight text-white">
              Ready to get started?
            </h2>
            <p className="mt-2 text-[17px] text-[#9FB0AB]">
              Join thousands of teams already using TeamFlow
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard" className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-medium text-[#04120F] transition-all hover:bg-[#0D9488] hover:text-white hover:shadow-xl hover:shadow-[#0D9488]/30 hover:scale-[1.02]">
              Start free trial
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href="#features" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-[15px] font-medium text-white transition-all hover:bg-white/10">
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E1EEEA] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
          <div className="grid gap-12 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0D9488] to-[#059669] text-sm font-bold text-white shadow-lg shadow-[#0D9488]/25">
                  T
                </div>
                <span className="text-[17px] font-bold tracking-tight">Team<span className="text-[#0D9488]">Flow</span></span>
              </div>
              <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-[#8B9A96]">
                The all-in-one project management platform that helps teams stay organized and ship faster.
              </p>
              <div className="mt-6 flex gap-4">
                {["Twitter", "LinkedIn", "GitHub", "YouTube"].map((social) => (
                  <Link key={social} href="#" className="text-[#8B9A96] transition-colors hover:text-[#0D9488]">
                    <span className="sr-only">{social}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E1EEEA] transition-all hover:border-[#0D9488]">
                      {social[0]}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-wider text-[#8B9A96]">Product</p>
              <ul className="mt-4 space-y-3">
                <li><Link href="#" className="text-[14px] text-[#4B5B57] transition-colors hover:text-[#0D9488]">Features</Link></li>
                <li><Link href="#" className="text-[14px] text-[#4B5B57] transition-colors hover:text-[#0D9488]">Pricing</Link></li>
                <li><Link href="#" className="text-[14px] text-[#4B5B57] transition-colors hover:text-[#0D9488]">Integrations</Link></li>
                <li><Link href="#" className="text-[14px] text-[#4B5B57] transition-colors hover:text-[#0D9488]">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-wider text-[#8B9A96]">Company</p>
              <ul className="mt-4 space-y-3">
                <li><Link href="#" className="text-[14px] text-[#4B5B57] transition-colors hover:text-[#0D9488]">About</Link></li>
                <li><Link href="#" className="text-[14px] text-[#4B5B57] transition-colors hover:text-[#0D9488]">Blog</Link></li>
                <li><Link href="#" className="text-[14px] text-[#4B5B57] transition-colors hover:text-[#0D9488]">Careers</Link></li>
                <li><Link href="#" className="text-[14px] text-[#4B5B57] transition-colors hover:text-[#0D9488]">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-wider text-[#8B9A96]">Legal</p>
              <ul className="mt-4 space-y-3">
                <li><Link href="#" className="text-[14px] text-[#4B5B57] transition-colors hover:text-[#0D9488]">Privacy</Link></li>
                <li><Link href="#" className="text-[14px] text-[#4B5B57] transition-colors hover:text-[#0D9488]">Terms</Link></li>
                <li><Link href="#" className="text-[14px] text-[#4B5B57] transition-colors hover:text-[#0D9488]">Security</Link></li>
                <li><Link href="#" className="text-[14px] text-[#4B5B57] transition-colors hover:text-[#0D9488]">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-[#E1EEEA] pt-8 text-center text-[13px] text-[#8B9A96]">
            © 2026 TeamFlow. All rights reserved. Made with ❤️ by the TeamFlow team.
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ─── Feature Card - 3D tilt on hover ─── */
function FeatureCard({ icon, title, desc, color }: { icon: React.ReactNode; title: string; desc: string; color: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 8 });
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${tilt.x !== 0 || tilt.y !== 0 ? -4 : 0}px)`,
        transition: "transform 220ms ease-out, box-shadow 220ms ease-out",
      }}
      className="group relative rounded-2xl border border-[#E1EEEA] bg-white p-8 shadow-[0_2px_8px_rgba(11,29,24,0.04)] hover:shadow-[0_24px_48px_-16px_rgba(13,148,136,0.25)]"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0D9488]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative" style={{ transform: "translateZ(20px)" }}>
        <div
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-[0_8px_16px_-6px_rgba(0,0,0,0.15)] transition-all group-hover:scale-110"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          {icon}
        </div>
        <h3 className="text-[18px] font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-[#4B5B57]">{desc}</p>
      </div>
    </div>
  );
}

/* ─── Step Card ─── */
function StepCard({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="relative rounded-2xl bg-white p-8 text-center shadow-sm border border-[#E1EEEA] transition-all hover:shadow-lg">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0D9488] to-[#059669] text-sm font-bold text-white shadow-lg shadow-[#0D9488]/25">
          {number}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-[18px] font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-[#4B5B57]">{desc}</p>
      </div>
    </div>
  );
}

/* ─── Pricing Card ─── */
function PricingCard({ name, price, period, features, cta, popular }: { name: string; price: string; period: string; features: string[]; cta: string; popular: boolean }) {
  return (
    <div
      className={`relative rounded-2xl border p-8 transition-all duration-300 ${
        popular
          ? "border-[#0D9488] bg-white shadow-[0_30px_60px_-20px_rgba(13,148,136,0.35)] lg:-translate-y-3"
          : "border-[#E1EEEA] bg-white hover:shadow-lg hover:-translate-y-1"
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-block rounded-full bg-gradient-to-r from-[#0D9488] to-[#059669] px-4 py-1 text-[11px] font-bold text-white shadow-lg shadow-[#0D9488]/25">
            Most Popular
          </span>
        </div>
      )}
      <div className="mt-2 text-center">
        <h3 className="text-[18px] font-semibold">{name}</h3>
        <div className="mt-3 flex items-baseline justify-center gap-1">
          <span className="text-[40px] font-bold tracking-tight">{price}</span>
          <span className="text-[14px] text-[#8B9A96]">/{period}</span>
        </div>
      </div>
      <ul className="mt-8 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-[14px] text-[#4B5B57]">
            <svg className="h-5 w-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
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
            ? "bg-gradient-to-r from-[#0D9488] to-[#059669] text-white hover:shadow-lg hover:shadow-[#0D9488]/30 hover:scale-[1.02]"
            : "border border-[#E1E4E7] bg-white text-[#0B1D18] hover:border-[#0D9488] hover:text-[#0D9488]"
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}

/* ─── Testimonial Card ─── */
function TestimonialCard({ quote, name, role, company, avatar }: { quote: string; name: string; role: string; company: string; avatar: string }) {
  return (
    <div className="rounded-2xl border border-[#E1EEEA] bg-white p-8 transition-all hover:shadow-lg">
      <div className="mb-4 flex text-[#F0B429]">{"★".repeat(5)}</div>
      <p className="text-[16px] leading-relaxed text-[#4B5B57]">{quote}</p>
      <div className="mt-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#0D9488] to-[#059669] text-sm font-bold text-white">
          {avatar}
        </div>
        <div>
          <p className="text-[15px] font-semibold">{name}</p>
          <p className="text-[13px] text-[#8B9A96]">{role} · {company}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Compact dashboard content shown inside the laptop screen ─── */
function DashboardScreenContent() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[6px] bg-white p-3 sm:p-4">
      <div className="flex items-center justify-between border-b border-[#E1EEEA] pb-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-[#FF6B6B]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#FFD93D]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#6BCB77]" />
          </div>
          <span className="ml-1 text-[10px] font-medium text-[#4B5B57] sm:text-[11px]">Website Redesign</span>
        </div>
        <span className="rounded-full bg-[#ECFDF5] px-2 py-0.5 text-[8px] font-medium text-[#0D9488] sm:text-[9px]">Active</span>
      </div>
      <div className="mt-3 grid flex-1 grid-cols-3 gap-2 sm:gap-3">
        {[
          { label: "To do", color: "#8B9A96", task: "Wireframe billing", tag: "MED" },
          { label: "In progress", color: "#F0B429", task: "API rate limiting", tag: "HIGH" },
          { label: "Done", color: "#10B981", task: "Auth token refresh", tag: "HIGH" },
        ].map((col) => (
          <div key={col.label}>
            <div className="mb-1.5 flex items-center gap-1 text-[7px] font-semibold uppercase tracking-wide text-[#8B9A96] sm:text-[8px]">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: col.color }} />
              {col.label}
            </div>
            <div className="rounded-md border border-[#E1EEEA] bg-white p-1.5 shadow-sm sm:p-2">
              <p className="text-[8px] font-medium leading-snug text-[#0B1D18] sm:text-[9px]">{col.task}</p>
              <span className="mt-1 inline-block rounded-full px-1.5 py-0.5 text-[6px] font-semibold text-white sm:text-[7px]" style={{ backgroundColor: col.color }}>
                {col.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[#E1EEEA] pt-2">
        <div className="flex -space-x-1.5">
          {["#0D9488", "#F0B429", "#10B981", "#8B5CF6"].map((color, i) => (
            <div key={i} className="h-4 w-4 rounded-full border border-white sm:h-5 sm:w-5" style={{ backgroundColor: color }} />
          ))}
        </div>
        <span className="text-[7px] text-[#8B9A96] sm:text-[8px]">4 members</span>
      </div>
    </div>
  );
}

/* ─── 3D laptop mockup illustration — SVG device frame + live screen + floating glass badges ─── */
function LaptopMockup3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: -5, y: 9 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 14 - 5, y: px * 18 + 9 });
  };

  const handleLeave = () => setTilt({ x: -5, y: 9 });

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative mx-auto max-w-[560px]"
      style={{ perspective: "1700px" }}
    >
      {/* ambient glow beneath the device */}
      <div className="absolute -inset-12 rounded-[48px] bg-gradient-to-br from-[#0D9488]/25 via-[#059669]/15 to-[#F0B429]/10 blur-3xl" />

      {/* floating badge — top left */}
      <div
        className="absolute -left-6 top-4 z-20 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/95 px-4 py-3 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:-left-10"
        style={{ transform: `translateZ(90px) rotate(${tilt.y * 0.15}deg)`, transition: "transform 200ms ease-out" }}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ECFDF5] text-[#0D9488]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <div>
          <p className="text-[12px] font-bold leading-none text-[#0B1D18]">98%</p>
          <p className="mt-1 text-[10px] leading-none text-[#8B9A96]">On-time delivery</p>
        </div>
      </div>

      {/* floating badge — bottom right */}
      <div
        className="absolute -bottom-6 -right-4 z-20 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/95 px-4 py-3 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:-right-8"
        style={{ transform: `translateZ(100px) rotate(${tilt.y * -0.12}deg)`, transition: "transform 200ms ease-out" }}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FEF3E2] text-[#D97706]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <div>
          <p className="text-[12px] font-bold leading-none text-[#0B1D18]">4 members</p>
          <p className="mt-1 text-[10px] leading-none text-[#8B9A96]">Active on sprint</p>
        </div>
      </div>

      {/* device: SVG frame with tilt, screen content overlaid on top */}
      <div
        className="relative z-10"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 250ms ease-out",
        }}
      >
        <svg viewBox="0 0 600 400" className="block w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]">
          <defs>
            <linearGradient id="bezel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1F2937" />
              <stop offset="100%" stopColor="#0B1220" />
            </linearGradient>
            <linearGradient id="deck" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="100%" stopColor="#1F2937" />
            </linearGradient>
            <linearGradient id="screenGlow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0D9488" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F0B429" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          {/* screen bezel */}
          <rect x="30" y="18" width="540" height="304" rx="18" fill="url(#bezel)" stroke="#374151" strokeWidth="1" />
          {/* screen inner */}
          <rect x="48" y="36" width="504" height="268" rx="6" fill="#050B14" />
          <rect x="48" y="36" width="504" height="268" rx="6" fill="url(#screenGlow)" />
          {/* camera notch */}
          <circle cx="300" cy="27" r="2.2" fill="#4B5563" />
          {/* base / keyboard deck */}
          <path d="M6 330 L594 330 L560 372 L40 372 Z" fill="url(#deck)" stroke="#111827" strokeWidth="1" />
          <rect x="270" y="345" width="60" height="6" rx="3" fill="#0B1220" />
        </svg>

        {/* live dashboard content, aligned to the screen area of the SVG above */}
        <div className="absolute left-[8%] top-[9%] h-[67%] w-[84%] overflow-hidden rounded-[6px]">
          <DashboardScreenContent />
        </div>
      </div>
    </div>
  );
}

/* ─── Icons ─── */
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