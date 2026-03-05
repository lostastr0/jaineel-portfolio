"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FUN_FACTS = [
  "Currently procrastinating on: Persona 3 Reload",
  "Tabs over spaces. No debate.",
  "My terminal is prettier than your IDE",
  "Arch Linux user, btw",
  "Fujifilm > everything else",
  "Coffee consumed building this: too many",
  "Lines of code deleted today: more than written",
  "Current mood: debugging at 2am",
];

const STACK_ICONS = [
  { name: "Next.js",       icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  { name: "TypeScript",    icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Framer Motion", icon: "https://cdn.simpleicons.org/framer/ffffff" },
  { name: "React",         icon: "https://cdn.simpleicons.org/react/61DAFB" },
];

const EASTER_EGG_MESSAGES = [
  "You found the easter egg 🥚",
  "Stop clicking me 😭",
  "Ok fine, have a cookie 🍪",
  "Seriously though, hire me 👀",
  "Still here? Respect 🫡",
];

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];
const OPEN_TO = ["Internships", "Freelance", "Collabs", "Part-time"];
const LAST_UPDATED = "March 2026";

export default function Footer() {
  const [factIndex, setFactIndex] = useState(0);
  const [eggCount, setEggCount] = useState(0);
  const [showEgg, setShowEgg] = useState(false);
  const [visits, setVisits] = useState(0);
  const [hoveredStack, setHoveredStack] = useState<string | null>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    setFactIndex(Math.floor(Math.random() * FUN_FACTS.length));
    const stored = parseInt(localStorage.getItem("jk_visits") || "0") + 1;
    localStorage.setItem("jk_visits", String(stored));
    setVisits(stored);
    const update = () =>
      setTime(new Date().toLocaleTimeString("en-AU", { timeZone: "Australia/Brisbane", hour: "2-digit", minute: "2-digit" }));
    update();
    const iv = setInterval(update, 60000);
    return () => clearInterval(iv);
  }, []);

  const cycleFact = () => setFactIndex((i) => (i + 1) % FUN_FACTS.length);
  const handleEgg = () => { setEggCount((c) => c + 1); setShowEgg(true); setTimeout(() => setShowEgg(false), 1800); };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (id: string) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{`
        @keyframes footerPulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .footer-card-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .footer-bottom-bar { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .footer-bottom-right { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        @media (max-width: 768px) {
          .footer-card-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-card-grid { grid-template-columns: 1fr !important; }
          .footer-bottom-bar { flex-direction: column; align-items: flex-start !important; gap: 16px !important; }
          .footer-bottom-right { flex-wrap: wrap; gap: 10px !important; }
        }
      `}</style>

      <footer style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px clamp(20px, 5vw, 48px) 36px" }}>

          {/* Heading — matches site section pattern */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-syne), Syne, sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.02em", lineHeight: 1 }}>
              That's a wrap.
            </h2>
            <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#374151" }}>
              Footer
            </span>
          </div>

          {/* Card grid */}
          <div className="footer-card-grid">

            {/* Card 1 — Identity */}
            <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "24px", background: "rgba(255,255,255,0.015)", display: "flex", flexDirection: "column", gap: 16 }}>
              <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "#374151" }}>Identity</span>

              <div style={{ position: "relative" }}>
                <motion.button onClick={handleEgg} whileTap={{ scale: 0.93, rotate: -3 }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  <span style={{ fontFamily: "var(--font-syne), Syne, sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", display: "block" }}>
                    Jaineel<span style={{ color: "#e0f2fe" }}>.</span>
                  </span>
                </motion.button>
                <AnimatePresence>
                  {showEgg && (
                    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: -36 }} exit={{ opacity: 0 }}
                      style={{ position: "absolute", left: 0, bottom: "100%", fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, color: "#e0f2fe", background: "#0a0a0a", border: "1px solid rgba(224,242,254,0.15)", borderRadius: 6, padding: "5px 10px", whiteSpace: "nowrap", zIndex: 10 }}>
                      {EASTER_EGG_MESSAGES[Math.min(eggCount - 1, EASTER_EGG_MESSAGES.length - 1)]}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 10, color: "#4b5563", letterSpacing: "0.02em", margin: 0, lineHeight: 1.7 }}>
                Cyber Security student.<br />Self-taught developer.<br />Based in Brisbane, AU.
              </p>

              <div style={{ display: "flex", gap: 6, marginTop: "auto", flexWrap: "wrap" as const }}>
                {[
                  { label: "GitHub",   href: "https://github.com/jaineelkhatri" },
                  { label: "LinkedIn", href: "https://linkedin.com/in/jaineelkhatri" },
                  { label: "Email",    href: "mailto:hello@jaineel.dev" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6b7280", textDecoration: "none", padding: "4px 9px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, transition: "all 0.18s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#e0f2fe"; e.currentTarget.style.borderColor = "rgba(224,242,254,0.2)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#6b7280"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Card 2 — Navigate */}
            <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "24px", background: "rgba(255,255,255,0.015)", display: "flex", flexDirection: "column", gap: 16 }}>
              <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "#374151" }}>Navigate</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {NAV_LINKS.map((link) => (
                  <button key={link} onClick={() => scrollTo(link)}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "var(--font-syne), Syne, sans-serif", fontSize: 13, fontWeight: 600, color: "#6b7280", letterSpacing: "-0.01em", transition: "color 0.18s", textAlign: "left" as const }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; (e.currentTarget.querySelector(".arr") as HTMLElement).style.opacity = "1"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#6b7280"; (e.currentTarget.querySelector(".arr") as HTMLElement).style.opacity = "0"; }}>
                    {link}
                    <span className="arr" style={{ fontSize: 11, opacity: 0, transition: "opacity 0.18s", color: "#e0f2fe" }}>↗</span>
                  </button>
                ))}
              </div>
              <motion.button onClick={scrollToTop} whileHover={{ y: -2 }} whileTap={{ scale: 0.94 }}
                style={{ marginTop: "auto", background: "rgba(224,242,254,0.04)", border: "1px solid rgba(224,242,254,0.1)", borderRadius: 6, padding: "9px 0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "#e0f2fe" }}>Back to top</span>
                <span style={{ fontSize: 11, color: "#e0f2fe" }}>↑</span>
              </motion.button>
            </div>

            {/* Card 3 — Status */}
            <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "24px", background: "rgba(255,255,255,0.015)", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "#374151" }}>Status</span>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.8)", animation: "footerPulse 2s ease-in-out infinite", display: "inline-block" }} />
                  <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: "#4ade80" }}>Available</span>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
                {OPEN_TO.map((tag) => (
                  <span key={tag} style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", border: "1px solid rgba(74,222,128,0.18)", borderRadius: 4, color: "rgba(74,222,128,0.7)", background: "rgba(74,222,128,0.04)" }}>
                    {tag}
                  </span>
                ))}
              </div>

              <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", padding: "10px 12px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 7, background: "rgba(255,255,255,0.02)", transition: "border-color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(29,185,84,0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#1DB954", boxShadow: "0 0 6px rgba(29,185,84,0.7)", animation: "footerPulse 2s ease-in-out infinite", flexShrink: 0, display: "inline-block" }} />
                <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, color: "#6b7280", letterSpacing: "0.06em" }}>Currently vibing</span>
                <img src="https://cdn.simpleicons.org/spotify/1DB954" width={11} height={11} alt="Spotify" style={{ marginLeft: "auto", opacity: 0.7 }} />
              </a>

              <motion.button onClick={cycleFact} whileTap={{ scale: 0.98 }}
                style={{ marginTop: "auto", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 7, padding: "10px 12px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 8, textAlign: "left" as const }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}>
                <span style={{ fontSize: 11, flexShrink: 0, marginTop: 1 }}>💡</span>
                <AnimatePresence mode="wait">
                  <motion.span key={factIndex} initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.16 }}
                    style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, color: "#6b7280", letterSpacing: "0.04em", lineHeight: 1.5 }}>
                    {FUN_FACTS[factIndex]}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "14px 24px", background: "rgba(255,255,255,0.015)" }} className="footer-bottom-bar">
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" as const }}>
              <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, letterSpacing: "0.1em", color: "#374151" }}>© 2025 Jaineel Khatri</span>
              <span style={{ color: "#1f2937" }}>·</span>
              <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, color: "#374151" }}>
                Updated: <span style={{ color: "#6b7280" }}>{LAST_UPDATED}</span>
              </span>
              {time && (
                <>
                  <span style={{ color: "#1f2937" }}>·</span>
                  <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, color: "#374151" }}>
                    Brisbane <span style={{ color: "#6b7280" }}>{time}</span>
                  </span>
                </>
              )}
            </div>
            <div className="footer-bottom-right">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: "#374151" }}>Built with</span>
                {STACK_ICONS.map((s) => (
                  <div key={s.name} onMouseEnter={() => setHoveredStack(s.name)} onMouseLeave={() => setHoveredStack(null)} style={{ position: "relative" }}>
                    <img src={s.icon} alt={s.name} width={13} height={13} style={{ objectFit: "contain", filter: hoveredStack === s.name ? "brightness(1.6)" : "brightness(0.35)", transition: "filter 0.2s", display: "block" }} />
                    {hoveredStack === s.name && (
                      <div style={{ position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-dm-mono), monospace", fontSize: 8, color: "#e0f2fe", background: "#0a0a0a", border: "1px solid rgba(224,242,254,0.12)", borderRadius: 4, padding: "3px 8px", whiteSpace: "nowrap", zIndex: 10 }}>
                        {s.name}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ width: 1, height: 12, background: "rgba(255,255,255,0.07)" }} />
              <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, color: "#374151" }}>
                Visit <span style={{ color: "#e0f2fe" }}>#{visits}</span>
              </span>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}