import React, { useState } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Camera,
  PenTool,
  Palette,
  Calendar,
  Globe2,
  Users,
  Workflow,
  MessageCircle,
  Rocket,
  Target,
  Star,
  Instagram,
  Linkedin,
  Play,
  CheckCircle,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#approach' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' }
];

const services = [
  {
    icon: Camera,
    name: 'Cinematic Production',
    description:
      'Full-scale shoots with direction, lighting and location scouting built for athletes and creators ready to headline.',
    deliverables: ['Storyboard & shot list', 'On-location crew', 'Hero edit + social cuts']
  },
  {
    icon: Palette,
    name: 'Visual Identity Systems',
    description:
      'Logos, typography, motion packages and digital kits that translate your personal brand across every platform.',
    deliverables: ['Brand playbook', 'Motion + static templates', 'Uniform & merch treatments']
  },
  {
    icon: PenTool,
    name: 'Content Engine Retainers',
    description:
      'Weekly sprints with creative direction, editing, copywriting and distribution support to keep you top of feed.',
    deliverables: ['Editorial roadmap', 'Multi-platform rollout', 'Analytics debriefs']
  },
  {
    icon: Globe2,
    name: 'Launch Campaigns',
    description:
      'Product drops and announcements engineered with short-form, landing pages and paid assets to convert attention.',
    deliverables: ['Campaign architecture', 'Paid-ready asset kit', 'Landing page design']
  }
];

const caseStudies = [
  {
    title: 'League-Wide Draft Presence',
    subtitle: 'NFL prospect tour',
    metrics: ['6M organic reach', '12 team features', '+28% follower growth'],
    gradient: 'from-orange-500/80 via-rose-500/60 to-purple-500/80'
  },
  {
    title: 'Global Jersey Drop',
    subtitle: 'Basketball apparel collective',
    metrics: ['Sold out in 3 hours', '42% returning customers', 'Campaign CPM $3.14'],
    gradient: 'from-cyan-400/80 via-sky-500/60 to-blue-500/80'
  },
  {
    title: 'Creator x Brand Originals',
    subtitle: 'YouTube personality',
    metrics: ['4-part documentary', '45% watch-through', 'Brand partnership renewals'],
    gradient: 'from-emerald-400/80 via-teal-400/60 to-lime-400/80'
  }
];

const process = [
  {
    step: 'Discover',
    title: 'Clarity Sprint',
    description:
      'We map the mission, audience and key story beats through collaborative workshops. Expect questions. Lots of them.',
    icon: Target
  },
  {
    step: 'Design',
    title: 'Build the World',
    description:
      'Moodboards, treatments and prototypes land fast so we can lock the aesthetic before we ever hit record.',
    icon: Palette
  },
  {
    step: 'Produce',
    title: 'Capture the Energy',
    description:
      'From location scouting to talent coordination, the crew is on-site ensuring every moment hits the mark.',
    icon: Camera
  },
  {
    step: 'Launch',
    title: 'Release + Iterate',
    description:
      'We deliver polished assets, schedule drops and stay close to the numbers so the next wave lands even bigger.',
    icon: Rocket
  }
];

const testimonials = [
  {
    quote:
      '“NextArc translated my story into visuals that felt like home but looked like a global franchise. The team is pure momentum.”',
    name: 'Alicia Benton',
    role: 'WNBA Forward & Entrepreneur'
  },
  {
    quote:
      '“From strategy to delivery, every asset came with context. Our launch crushed KPIs and finally made our paid spend make sense.”',
    name: 'Lucas Garner',
    role: 'Head of Marketing, Apex Nutrition'
  },
  {
    quote:
      '“They built a narrative universe for my brand. Weekly content drops, monthly campaigns and no more scramble mode.”',
    name: 'Jalen Ortiz',
    role: 'Creator & Community Host'
  }
];

const packages = [
  {
    name: 'Season Starter',
    price: '3.5k',
    description: 'Perfect for athletes locking in their first major narrative moment this season.',
    highlights: ['Creative intensive + blueprint', 'One hero film & 6 social edits', 'Photo selects & graphic toolkit']
  },
  {
    name: 'Momentum Retainer',
    price: '5.8k',
    description: 'Bi-weekly production cycle designed to keep the content engine pulsing.',
    highlights: ['Editorial calendar', 'On-call edit bay', 'Monthly analytics huddle']
  },
  {
    name: 'Flagship Campaign',
    price: 'Custom',
    description: 'Launches, partnerships and worldbuilding for brands and creators entering new arenas.',
    highlights: ['Full campaign strategy', 'Paid + owned rollout kits', 'Dedicated producer + comms']
  }
];

const contactChannels = [
  { icon: Mail, label: 'hello@nextarc.studio', href: 'mailto:hello@nextarc.studio' },
  { icon: Instagram, label: '@nextarc.studio', href: 'https://instagram.com' },
  { icon: Linkedin, label: 'NextArc Studio', href: 'https://linkedin.com' }
];

const NextArcStudio = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(236,72,153,0.16),transparent_55%)]" />
        <div className="absolute top-1/4 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute bottom-16 right-1/3 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="NextArc Studio" className="h-12 w-12 rounded-xl border border-white/10 bg-white/5 p-2" />
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">NextArc Studio</p>
              <p className="text-lg font-semibold text-white">Brand Worlds for Modern Athletes</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-200 md:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="group relative transition hover:text-white">
                {item.label}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white transition hover:border-white/40 hover:bg-white/20"
            >
              Start a Project <ArrowRight className="h-4 w-4" />
            </a>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-slate-950/95 px-4 pb-6 pt-2 md:hidden">
            <nav className="flex flex-col gap-3 text-sm text-slate-200">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 hover:bg-white/10"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white"
              >
                Start a Project <ArrowRight className="h-4 w-4" />
              </a>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-20 pt-16 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200">
                <Sparkles className="h-4 w-4" />
                Integrated Creative Unit
              </div>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
                Building the future of athlete-led brands and creator IP.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-300">
                NextArc Studio architects stories, content ecosystems and campaign launches that move culture forward. From tunnel fits to flagship releases, we operate as the in-house creative arm for modern athletes and creators.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
                >
                  Launch Your Next Chapter
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
                >
                  See the Proof
                  <Play className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="relative flex-1">
              <div className="relative mx-auto max-w-md rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-slate-900/60 to-slate-900/90 p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Active Roster</p>
                    <p className="mt-2 text-3xl font-semibold text-white">17</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">
                    Studio Pulse
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {[{
                    title: 'Content drops this week',
                    metric: '36 assets',
                    detail: '+12 vs target'
                  }, {
                    title: 'Campaign launch window',
                    metric: '9 days',
                    detail: 'All teams locked'
                  }, {
                    title: 'Platform expansion',
                    metric: '3 new formats',
                    detail: 'Shorts, live, web'
                  }].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{item.title}</p>
                      <div className="mt-2 flex items-baseline justify-between">
                        <p className="text-2xl font-semibold text-white">{item.metric}</p>
                        <span className="text-xs font-medium text-emerald-300">{item.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5" />
                    <div>
                      <p className="font-semibold uppercase tracking-[0.25em]">Realtime analytics</p>
                      <p className="mt-1 text-[11px] text-emerald-200/80">Shared dashboards across team + partners</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
              <div className="absolute -left-10 -top-6 h-20 w-20 rounded-full bg-cyan-400/40 blur-2xl" />
              <div className="absolute -right-6 bottom-10 h-24 w-24 rounded-full bg-emerald-400/30 blur-2xl" />
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-slate-950/60">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-12 text-sm text-slate-300">
            {[
              { label: 'Launches delivered', value: '48+' },
              { label: 'Creators on roster', value: '30+' },
              { label: 'Average ROI', value: '4.6x' },
              { label: 'Retention', value: '92%' }
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1 text-center sm:text-left">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.label}</span>
                <span className="text-2xl font-semibold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-4 py-20">
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="max-w-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">What we do</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Your end-to-end creative operations partner.</h2>
              <p className="mt-6 text-slate-300">
                Strategy, execution and iteration under one roof. We plug into your team, build the roadmap and ship work that feels custom because it is.
              </p>
              <div className="mt-8 flex items-center gap-3 text-sm text-slate-400">
                <Users className="h-5 w-5" />
                Multidisciplinary crew across video, design, copy and growth.
              </div>
            </div>
            <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
              {services.map((service) => (
                <div key={service.name} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30 hover:bg-white/10">
                  <service.icon className="h-10 w-10 text-white/80" />
                  <h3 className="mt-4 text-xl font-semibold text-white">{service.name}</h3>
                  <p className="mt-3 text-sm text-slate-300">{service.description}</p>
                  <ul className="mt-6 space-y-2 text-sm text-slate-200/70">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="absolute -right-20 -top-20 h-32 w-32 rounded-full bg-white/10 blur-3xl transition group-hover:bg-white/20" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="border-y border-white/5 bg-slate-900/40 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Selected work</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Campaigns engineered to move culture.</h2>
              </div>
              <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-slate-200">
                Request the full reel <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {caseStudies.map((item) => (
                <div key={item.title} className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${item.gradient} p-6 text-slate-900 shadow-2xl`}>
                  <div className="rounded-full border border-black/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
                    {item.subtitle}
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{item.title}</h3>
                  <ul className="mt-6 space-y-2 text-sm text-white/90">
                    {item.metrics.map((metric) => (
                      <li key={metric} className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                    Explore project <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid gap-12 lg:grid-cols-[0.45fr_1fr]">
            <div className="max-w-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">How we work</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">A collaborative system built for speed and storytelling.</h2>
              <p className="mt-6 text-slate-300">
                Every engagement runs through our adaptive framework. It keeps us intentional, fast and endlessly curious about what will resonate next.
              </p>
              <div className="mt-6 flex flex-col gap-3 text-sm text-slate-400">
                <div className="flex items-center gap-3">
                  <Workflow className="h-5 w-5" />
                  Shared Notion & Airtable workspace
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5" />
                  Weekly cadence with real-time pivots
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5" />
                  Dedicated producer & open comms channel
                </div>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {process.map((phase, index) => (
                <div key={phase.step} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span>{phase.step}</span>
                  </div>
                  <phase.icon className="mt-6 h-10 w-10 text-white" />
                  <h3 className="mt-4 text-xl font-semibold text-white">{phase.title}</h3>
                  <p className="mt-3 text-sm text-slate-300">{phase.description}</p>
                  <div className="absolute -right-20 -top-16 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="border-y border-white/5 bg-slate-900/30 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Partnerships</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Choose the runway that fits your ambitions.</h2>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {packages.map((pkg) => (
                <div key={pkg.name} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">{pkg.name}</h3>
                    <div className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
                      {pkg.price === 'Custom' ? 'Consult' : pkg.price}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-300">{pkg.description}</p>
                  <ul className="mt-6 space-y-2 text-sm text-slate-200/70">
                    {pkg.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-300" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-slate-200">
                    Book a strategy call <ArrowRight className="h-4 w-4" />
                  </a>
                  <div className="absolute -bottom-16 right-0 h-24 w-24 rounded-full bg-white/10 blur-3xl" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid gap-12 lg:grid-cols-[0.4fr_1fr]">
            <div className="max-w-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Voices</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Trusted by athletes, founders and creative teams across the globe.</h2>
              <p className="mt-6 text-slate-300">
                We merge the pulse of sports culture with brand strategy. The result: partnerships that last and audiences that care.
              </p>
            </div>
            <div className="space-y-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-lg text-white">{testimonial.quote}</p>
                  <div className="mt-6 text-sm text-slate-300">
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-slate-900/40 py-16">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200">
              <Sparkles className="h-4 w-4" />
              Latest headlines
            </div>
            <div className="grid w-full grid-cols-1 gap-6 text-left md:grid-cols-3">
              {[
                {
                  title: 'How athletes can own their story in a creator economy',
                  label: 'Playbook'
                },
                {
                  title: 'Beyond the tunnel fit: designing multi-touch brand systems',
                  label: 'Deep Dive'
                },
                {
                  title: 'Why launch velocity beats vanity metrics every single time',
                  label: 'Opinion'
                }
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.label}</span>
                  <p className="mt-3 text-lg font-semibold text-white">{item.title}</p>
                  <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Read the memo <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-5xl px-4 py-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
            <div className="grid gap-12 md:grid-cols-[0.55fr_1fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Start</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Let’s architect your next drop, doc or digital universe.</h2>
                <p className="mt-6 text-slate-300">
                  Share a few details about the moment you’re building towards. We’ll respond within 24 hours with next steps and available windows.
                </p>
                <div className="mt-8 space-y-4 text-sm text-slate-300">
                  {contactChannels.map((channel) => (
                    <a key={channel.label} href={channel.href} className="flex items-center gap-3 transition hover:text-white">
                      <channel.icon className="h-5 w-5" />
                      {channel.label}
                    </a>
                  ))}
                </div>
              </div>
              <form className="space-y-6">
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-white/30 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Email</label>
                  <input
                    type="email"
                    placeholder="you@brand.com"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-white/30 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-400">What are we building?</label>
                  <select
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white focus:border-white/30 focus:outline-none"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select the moment
                    </option>
                    <option value="launch">Launch campaign</option>
                    <option value="brand">Brand identity system</option>
                    <option value="retainer">Content engine retainer</option>
                    <option value="story">Doc / storytelling series</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Tell us everything</label>
                  <textarea
                    rows={5}
                    placeholder="Timeline, platforms, collaborators, inspiration…"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-white/30 focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                >
                  Submit & Schedule Intro
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <img src="/assets/logo.png" alt="NextArc Studio" className="h-10 w-10 rounded-lg border border-white/10 bg-white/5 p-2" />
              <p className="text-sm font-semibold text-white">NextArc Studio</p>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              We build brand worlds for athletes and creators ready for their next chapter.
            </p>
            <div className="mt-4 flex items-center gap-4 text-slate-400">
              <a href="https://instagram.com" className="hover:text-white" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="hover:text-white" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 text-sm text-slate-400 sm:grid-cols-3">
            <div>
              <p className="font-semibold uppercase tracking-[0.3em] text-slate-500">Explore</p>
              <ul className="mt-4 space-y-2">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-[0.3em] text-slate-500">Studio</p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Remote-first • NYC / Toronto / LA
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +1 (332) 877-1204
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  hello@nextarc.studio
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-[0.3em] text-slate-500">Newsletter</p>
              <p className="mt-4 text-slate-400">
                Monthly strategy memos on athlete IP, creator commerce and launch strategy.
              </p>
              <form className="mt-4 flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 rounded-full border border-white/10 bg-slate-950/40 px-4 py-2 text-sm text-white placeholder-slate-500 focus:border-white/30 focus:outline-none"
                />
                <button type="submit" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200">
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} NextArc Studio. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default NextArcStudio;
