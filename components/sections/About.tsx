"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as number[] },
  });

  const card = (extra?: React.CSSProperties): React.CSSProperties => ({
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 4,
    padding: "24px 28px",
    ...extra,
  });

  const sectionLabel = (color?: string): React.CSSProperties => ({
    fontFamily: "var(--font-dm-mono)",
    fontSize: 9,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: color ?? "#6b7280",
    marginBottom: 14,
  });

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

        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 36, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
            About <span style={{ color: "#e0f2fe" }}>me</span>
          </h2>
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b7280" }}>01 / 04</span>
        </motion.div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 10 }}>

          {/* Big bio card — spans both rows */}
          <motion.div {...fadeUp(0.1)} style={{ ...card({ gridRow: "span 2", display: "flex", flexDirection: "column", gap: 24 }) }}>
            <div>
              <div style={sectionLabel()}>Bio</div>
              <p style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(18px,2vw,26px)", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.02em", color: "#efefef", marginBottom: 20 }}>
                Cyber Security student.{" "}
                <span style={{ color: "#e0f2fe" }}>Self-taught</span> developer.
                Building at the intersection of{" "}
                <span style={{ color: "#e0f2fe" }}>security and code</span>.
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.9, color: "#c8c8d8" }}>
                I&apos;ve been into tech for as long as I can remember. Right now that looks like studying Cyber Security at TAFE QLD, building interfaces with React &amp; Next.js, and obsessing over my Arch Linux setup on KDE. B.CS starts 2027 — until then, building everything I can get my hands on.
              </p>
            </div>

            {/* Tech I'm using */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20 }}>
              <div style={sectionLabel()}>Tech I&apos;m using</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
                {["Next.js", "TypeScript", "React", "Python", "Arch Linux", "KDE", "Windows", "Android"].map((item, i, arr) => (
                  <span key={item} style={{ fontFamily: "var(--font-dm-mono)", fontSize: 11, color: "#c8c8d8", letterSpacing: "0.06em" }}>
                    {item}{i < arr.length - 1 && <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 10px" }}>·</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20 }}>
              <div style={sectionLabel()}>Education</div>
              {[
                { year: "2027 →", label: "Bachelor of Computer Science", muted: true },
                { year: "2025",   label: "Cert IV Cyber Security · TAFE QLD", active: true },
                { year: "2021",   label: "Grade 12 · Balmoral State High" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, color: item.active ? "#e0f2fe" : "#6b7280", flexShrink: 0, width: 42 }}>{item.year}</span>
                  <span style={{ fontSize: 12, color: item.active ? "#efefef" : item.muted ? "#6b7280" : "#c8c8d8", flex: 1 }}>{item.label}</span>
                  {item.active && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#e0f2fe", boxShadow: "0 0 6px rgba(224,242,254,0.8)", flexShrink: 0 }} />}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Currently working on */}
          <motion.div {...fadeUp(0.2)} style={card()}>
            <div style={sectionLabel("rgba(224,242,254,0.5)")}>Currently working on</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "This portfolio — React · Next.js",
                "Cert IV Cyber Security labs",
                "Python security scripting",
              ].map((item) => (
                <li key={item} style={{ fontSize: 13, color: "#c8c8d8", display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ color: "#e0f2fe", flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Goals + details */}
          <motion.div {...fadeUp(0.3)} style={card({ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 })}>
            <div>
              <div style={sectionLabel("rgba(224,242,254,0.5)")}>Where I&apos;m headed</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "B.CS · 2027",
                  "Junior dev or security role",
                  "Security + UX tools",
                ].map((item) => (
                  <li key={item} style={{ fontSize: 13, color: "#c8c8d8", display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ color: "#e0f2fe", flexShrink: 0 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div style={sectionLabel()}>Details</div>
              {[
                { k: "Location", v: "Brisbane, AU" },
                { k: "OS",       v: "Arch · KDE", ice: true },
                { k: "Stack",    v: "React · Next.js", ice: true },
                { k: "Status",   v: "● Open to work", green: true },
              ].map(({ k, v, ice, green }) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6b7280" }}>{k}</span>
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, color: green ? "#4ade80" : ice ? "#e0f2fe" : "#efefef" }}>{v}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}