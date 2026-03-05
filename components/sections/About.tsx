"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TECH = ["Next.js", "TypeScript", "React", "Python", "Arch Linux", "KDE", "Git", "Linux"];

const EDUCATION = [
  { year: "2027 →", label: "Bachelor of Computer Science · QUT", muted: true },
  { year: "2025",   label: "Cert IV Cyber Security · TAFE QLD", active: true },
  { year: "2021",   label: "Grade 12 · Balmoral State High" },
];

const WORKING_ON = [
  "This portfolio — React · Next.js",
  "Cert IV Cyber Security labs",
  "Python security scripting",
  "Hawthorne Corner Store site",
];

const GOALS = [
  "B.CS at QUT · 2027",
  "Junior dev or security role",
  "Security + UX tools",
];

const DETAILS = [
  { k: "Location", v: "Brisbane, AU" },
  { k: "OS",       v: "Arch · KDE",      ice: true },
  { k: "Stack",    v: "React · Next.js",  ice: true },
  { k: "Status",   v: "Open to work",     green: true },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: "easeOut" },
  });

  const card = (extra?: React.CSSProperties): React.CSSProperties => ({
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 4,
    padding: "24px 28px",
    ...extra,
  });

  const label: React.CSSProperties = {
    fontFamily: "var(--font-dm-mono)",
    fontSize: 9,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "rgba(200,200,216,0.45)",
    marginBottom: 14,
  };

  return (
    <section
      id="about"
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "radial-gradient(ellipse 60% 55% at 50% 40%, rgba(14,14,18,1) 0%, rgba(6,6,8,1) 60%, #020204 100%)",
      }}
    >
      <div style={{ position: "absolute", width: 700, height: 400, background: "radial-gradient(ellipse at 50% 50%, rgba(224,242,254,0.04) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(2,2,4,0.6) 100%)" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px", position: "relative", zIndex: 1, width: "100%" }}>

        {/* Section header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 40, paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(200,200,216,0.45)", marginBottom: 12 }}>
            <span style={{ width: 24, height: 1, background: "rgba(224,242,254,0.2)", display: "inline-block" }} />
            01 / 04
          </div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <h2 style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(32px,4vw,56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, margin: 0 }}>
              About <span style={{ color: "#e0f2fe" }}>me</span>
            </h2>
            <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(200,200,216,0.35)" }}>
              Brisbane, AU
            </span>
          </div>
        </motion.div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 10 }}>

          {/* Left — bio card spanning both rows */}
          <motion.div {...fadeUp(0.1)} style={{ ...card({ gridRow: "span 2", display: "flex", flexDirection: "column", gap: 0 }) }}>

            {/* Bio */}
            <div style={{ paddingBottom: 24 }}>
              <div style={label}>Bio</div>
              <p style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(17px,1.8vw,24px)", fontWeight: 700, lineHeight: 1.35, letterSpacing: "-0.02em", color: "#efefef", marginBottom: 16 }}>
                Cyber Security student.{" "}
                <span style={{ color: "#e0f2fe" }}>Self-taught</span> developer.
                Building at the intersection of{" "}
                <span style={{ color: "#e0f2fe" }}>security and code</span>.
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.9, color: "rgba(200,200,216,0.7)" }}>
                I&apos;ve been into tech for as long as I can remember. Right now that looks like studying Cyber Security at TAFE QLD, building interfaces with React &amp; Next.js, and obsessing over my Arch Linux setup on KDE. B.CS starts 2027 — until then, building everything I can get my hands on.
              </p>
            </div>

            {/* Tech */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, paddingBottom: 24 }}>
              <div style={label}>Tech I&apos;m using</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {TECH.map((item) => (
                  <span key={item} style={{
                    fontFamily: "var(--font-dm-mono)", fontSize: 10, color: "rgba(200,200,216,0.7)",
                    letterSpacing: "0.08em", padding: "4px 10px",
                    border: "1px solid rgba(255,255,255,0.07)", borderRadius: 2,
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, flex: 1 }}>
              <div style={label}>Education</div>
              {EDUCATION.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, color: item.active ? "#e0f2fe" : "rgba(200,200,216,0.3)", flexShrink: 0, width: 46 }}>{item.year}</span>
                  <span style={{ fontSize: 12, color: item.active ? "#efefef" : item.muted ? "rgba(200,200,216,0.3)" : "rgba(200,200,216,0.6)", flex: 1, letterSpacing: "0.01em" }}>{item.label}</span>
                  {item.active && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#e0f2fe", boxShadow: "0 0 6px rgba(224,242,254,0.8)", flexShrink: 0 }} />}
                </div>
              ))}
            </div>

          </motion.div>

          {/* Top right — currently working on */}
          <motion.div {...fadeUp(0.2)} style={card({ display: "flex", flexDirection: "column", gap: 0 })}>
            <div style={label}>Currently working on</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {WORKING_ON.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < WORKING_ON.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#e0f2fe", opacity: 0.5, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "rgba(200,200,216,0.7)", letterSpacing: "0.01em" }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bottom right — goals + details */}
          <motion.div {...fadeUp(0.3)} style={card({ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 })}>

            <div>
              <div style={label}>Where I&apos;m headed</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {GOALS.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: i < GOALS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <span style={{ color: "#e0f2fe", flexShrink: 0, fontSize: 11, opacity: 0.6 }}>→</span>
                    <span style={{ fontSize: 12, color: "rgba(200,200,216,0.7)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={label}>Details</div>
              {DETAILS.map(({ k, v, ice, green }) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(200,200,216,0.35)" }}>{k}</span>
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.05em", color: green ? "#4ade80" : ice ? "#e0f2fe" : "#efefef", display: "flex", alignItems: "center", gap: 5 }}>
                    {green && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 5px #4ade80", display: "inline-block" }} />}
                    {v}
                  </span>
                </div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
