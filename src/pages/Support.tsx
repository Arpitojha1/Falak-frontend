import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Support page — convergence palette only (Midnight Indigo + Silver + Magenta).
// No track-specific colors (no Orange/Lime/Violet/Pearl).
// ─────────────────────────────────────────────────────────────────────────────

const PR_CONTACTS = [
  {
    name: 'Advika Jain',
    role: 'PR Head',
    phone: '+91 91794 20378',
    href: 'tel:+919179420378',
  },
  {
    name: 'Arshia Jain',
    role: 'PR Head',
    phone: '+91 81989 80059',
    href: 'tel:+918198980059',
  },
];

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Support() {
  const { hash } = useLocation();

  // Smooth-scroll to anchor on mount (footer links to #faq / #contact)
  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <main className="w-full min-h-screen bg-midnight-indigo text-silver pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">

        {/* ── Page header ── */}
        <motion.div
          variants={FADE_UP}
          custom={0}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-convergence-magenta mb-4">
            Falak '26
          </p>
          <h1 className="font-accent font-extrabold text-4xl md:text-5xl text-silver leading-tight">
            Support
          </h1>
          <p className="font-sans text-silver/60 mt-3 text-base leading-relaxed max-w-md">
            Reach out to the team for queries, registrations, or anything else about the festival.
          </p>
          <div className="mt-6 h-px w-16 bg-convergence-magenta/50" />
        </motion.div>

        {/* ── Contact section ── */}
        <section id="contact" className="scroll-mt-28">
          <motion.p
            variants={FADE_UP}
            custom={1}
            initial="hidden"
            animate="visible"
            className="font-mono text-[10px] uppercase tracking-[0.28em] text-silver/40 mb-6"
          >
            Direct Contact
          </motion.p>

          <div className="flex flex-col gap-4">
            {PR_CONTACTS.map((contact, i) => (
              <motion.a
                key={contact.href}
                href={contact.href}
                variants={FADE_UP}
                custom={i + 2}
                initial="hidden"
                animate="visible"
                className="group flex items-center justify-between p-5 md:p-6
                  border border-silver/10 hover:border-convergence-magenta/40
                  bg-white/[0.02] hover:bg-convergence-magenta/[0.04]
                  rounded-xl transition-all duration-300"
              >
                {/* Left: name + role */}
                <div className="flex flex-col gap-1">
                  <span className="font-sans font-semibold text-base md:text-lg text-silver group-hover:text-white transition-colors">
                    {contact.name}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-silver/40 group-hover:text-convergence-magenta/80 transition-colors">
                    {contact.role}
                  </span>
                </div>

                {/* Right: phone */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-sm text-silver/70 group-hover:text-white transition-colors hidden sm:block">
                    {contact.phone}
                  </span>
                  <span className="w-9 h-9 rounded-full border border-silver/15 group-hover:border-convergence-magenta/50 group-hover:bg-convergence-magenta/10 flex items-center justify-center transition-all duration-300">
                    <Phone size={15} strokeWidth={1.5} className="text-silver/50 group-hover:text-convergence-magenta transition-colors" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Mobile phone numbers shown below cards on small screens */}
          <div className="mt-4 flex flex-col gap-2 sm:hidden">
            {PR_CONTACTS.map((contact) => (
              <p key={contact.href} className="font-mono text-xs text-silver/50 px-1">
                {contact.name}: <span className="text-silver/70">{contact.phone}</span>
              </p>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
