"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const PROJECTS = [
  {
    num: "01", name: "Portfolio", tag: "Web Dev", year: "2025",
    chips: ["Next.js", "TypeScript", "Framer Motion"],
    desc: "This site — designed and built from scratch. Dark theme, 3D perspective hero, particle systems, live Spotify widget, and custom cursor.",
    href: "#", wip: false, accent: "#e0f2fe", featured: true,
  },
  {
    num: "02", name: "Password Strength Checker", tag: "Security", year: "2025",
    chips: ["Python"],
    desc: "Analyses passwords against security criteria — length, complexity, character variety, and common patterns.",
    href: "https://github.com/lostastr0/password-strength-checker", wip: false, accent: "#4ade80", featured: false,
  },
  {
    num: "03", name: "Hawthorne Corner Store", tag: "Web Dev", year: "2025",
    chips: ["React", "Next.js", "TypeScript"],
    desc: "A website for a family-run convenience store — clean storefront, store info, built to bring the business online.",
    href: "https://www.hawthornecornerstore.com.au/", wip: false, accent: "#fb923c", featured: false,
  },
  {
    num: "04", name: "Next project", tag: "WIP", year: "2025",
    chips: ["TBD"],
    desc: "Always building. Next project in the works — stay tuned.",
    href: "#", wip: true, accent: "#facc15", featured: false,
  },
];

function FeaturedCard({ p, inView }: { p: typeof PROJECTS[0]; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="featured-card"
      style={{
        gridColumn: "span 2", background: "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? p.accent + "40" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 8, padding: "clamp(24px, 4vw, 40px) clamp(24px, 4vw, 44px)",
        position: "relative", overflow: "hidden", transition: "border-color 0.3s",
        cursor: "default",
      }}
    >
      <div style={{ position: "absolute", bottom: -20, right: 20, fontFamily: "var(--font-syne)", fontSize: "clamp(80px, 15vw, 180px)", fontWeight: 800, color: "rgba(255,255,255,0.025)", lineHeight: 1, userSelect: "none", pointerEvents: "none", letterSpacing: "-0.05em" }}>
        {p.num}
      </div>

      <div className="featured-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: p.accent }}>{p.num}</span>
            <span style={{ width: 24, height: 1, background: "rgba(255,255,255,0.1)" }} />
            <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,200,216,0.4)" }}>{p.tag}</span>
          </div>
          <h3 style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(28px, 4vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: hovered ? "#fff" : "#efefef", transition: "color 0.3s", margin: 0 }}>
            {p.name}
          </h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24 }}>
            {p.chips.map(c => (
              <span key={c} style={{ fontFamily: "var(--font-dm-mono)", fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 12px", border: `1px solid ${hovered ? p.accent + "40" : "rgba(255,255,255,0.08)"}`, borderRadius: 3, color: hovered ? p.accent : "rgba(200,200,216,0.6)", transition: "all 0.3s" }}>
                {c}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "rgba(200,200,216,0.7)", margin: 0 }}>{p.desc}</p>
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", padding: "3px 10px", background: `${p.accent}15`, border: `1px solid ${p.accent}30`, borderRadius: 3, color: p.accent, width: "fit-content" }}>
            Featured
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ p, delay, inView }: { p: typeof PROJECTS[0]; delay: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${p.accent}05` : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? p.accent + "40" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 8, padding: "28px 32px", position: "relative", overflow: "hidden",
        transition: "border-color 0.3s, background 0.3s", display: "flex", flexDirection: "column", gap: 20, cursor: "default",
      }}
    >
      <div style={{ position: "absolute", bottom: -10, right: 16, fontFamily: "var(--font-syne)", fontSize: "clamp(60px, 10vw, 100px)", fontWeight: 800, color: "rgba(255,255,255,0.025)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
        {p.num}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.2em", color: p.accent }}>{p.num}</span>
          <span style={{ width: 16, height: 1, background: "rgba(255,255,255,0.1)" }} />
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(200,200,216,0.4)" }}>{p.tag}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {p.wip && <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", color: "#facc15", border: "1px solid rgba(250,204,21,0.25)", padding: "2px 8px", borderRadius: 3 }}>WIP</span>}
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, color: "rgba(200,200,216,0.3)" }}>{p.year}</span>
        </div>
      </div>
      <h3 style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(18px, 2.2vw, 28px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, color: hovered ? "#fff" : "#efefef", transition: "color 0.3s", margin: 0 }}>
        {p.name}
      </h3>
      <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(200,200,216,0.6)", margin: 0, flex: 1 }}>{p.desc}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {p.chips.map(c => (
            <span key={c} style={{ fontFamily: "var(--font-dm-mono)", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 10px", border: `1px solid ${hovered ? p.accent + "35" : "rgba(255,255,255,0.07)"}`, borderRadius: 3, color: hovered ? p.accent : "rgba(200,200,216,0.5)", transition: "all 0.3s" }}>
              {c}
            </span>
          ))}
        </div>
        {!p.wip && p.href !== "#" ? (
          <a href={p.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: p.accent, textDecoration: "none", display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
            View ↗
          </a>
        ) : p.wip ? (
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(200,200,216,0.25)" }}>Soon</span>
        ) : null}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const featured = PROJECTS.find(p => p.featured)!;
  const rest = PROJECTS.filter(p => !p.featured);

  return (
    <>
      <style>{`
        .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .featured-card { grid-column: span 2 !important; }
        .featured-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .featured-card { grid-column: span 1 !important; }
          .featured-inner { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
      <section id="projects" ref={ref} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "radial-gradient(ellipse 60% 55% at 50% 40%, rgba(14,14,18,1) 0%, rgba(6,6,8,1) 60%, #020204 100%)" }}>
        <div style={{ position: "absolute", width: 700, height: 400, background: "radial-gradient(ellipse at 50% 50%, rgba(224,242,254,0.03) 0%, transparent 70%)", top: "40%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(2,2,4,0.6) 100%)" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px clamp(20px, 5vw, 48px)", position: "relative", zIndex: 1, width: "100%" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
            style={{ marginBottom: 40, paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(200,200,216,0.45)", marginBottom: 12 }}>
              <span style={{ width: 24, height: 1, background: "rgba(224,242,254,0.2)", display: "inline-block" }} />
              03 / 04
            </div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <h2 style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(32px,4vw,56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, margin: 0 }}>
                Selected <span style={{ color: "#e0f2fe" }}>work</span>
              </h2>
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(200,200,216,0.35)" }}>
                {PROJECTS.filter(p => !p.wip).length} projects
              </span>
            </div>
          </motion.div>

          <div className="projects-grid">
            <FeaturedCard p={featured} inView={inView} />
            {rest.map((p, i) => (
              <ProjectCard key={p.num} p={p} delay={0.2 + i * 0.1} inView={inView} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}