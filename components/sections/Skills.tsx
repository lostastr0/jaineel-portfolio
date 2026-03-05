"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const TREE = [
  {
    category: "Frontend", color: "#e0f2fe", description: "Building interfaces",
    summary: "My primary focus — building fast, accessible UIs with modern frameworks.",
    skills: [
      { name: "React",      icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Next.js",    icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "Tailwind",   icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "HTML/CSS",   icon: "https://cdn.simpleicons.org/html5/E34F26" },
      { name: "Framer Motion", icon: "https://cdn.simpleicons.org/framer/0055FF" },
    ],
  },
  {
    category: "Security & Dev", color: "#4ade80", description: "Scripting & tooling",
    summary: "Cert IV focus — network security, Python scripting and Linux fundamentals.",
    skills: [
      { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "Linux",  icon: "https://cdn.simpleicons.org/linux/ffffff" },
      { name: "Bash",   icon: "https://cdn.simpleicons.org/gnubash/ffffff" },
      { name: "Git",    icon: "https://cdn.simpleicons.org/git/F05032" },
      { name: "GitHub", icon: "https://cdn.simpleicons.org/github/ffffff" },
    ],
  },
  {
    category: "Environment", color: "#a78bfa", description: "Daily OS & setup",
    summary: "Arch Linux on KDE as daily driver. Windows for gaming. Android daily carry.",
    skills: [
      { name: "VS Code",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "KDE",      icon: "https://cdn.simpleicons.org/kde/1D99F3" },
      { name: "Arch",     icon: "https://cdn.simpleicons.org/archlinux/1793D1" },
      { name: "Windows",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" },
      { name: "Android",  icon: "https://cdn.simpleicons.org/android/3DDC84" },
      { name: "Extensions", icon: "https://cdn.simpleicons.org/visualstudiocode/007ACC" },
    ],
  },
  {
    category: "Daily Tools", color: "#fb923c", description: "Always open",
    summary: "Discord for comms, Notion for notes and planning, Spotify on shuffle always.",
    skills: [
      { name: "Discord", icon: "https://cdn.simpleicons.org/discord/5865F2" },
      { name: "Notion",  icon: "https://cdn.simpleicons.org/notion/ffffff" },
      { name: "Spotify", icon: "https://cdn.simpleicons.org/spotify/1DB954" },
      { name: "Obsidian", icon: "https://cdn.simpleicons.org/obsidian/7C3AED" },
    ],
  },
  {
    category: "Cyber & Networking", color: "#f43f5e", description: "Security tooling",
    summary: "Tools used in Cert IV labs and personal security research — network analysis, recon and more.",
    skills: [
      { name: "Wireshark", icon: "https://cdn.simpleicons.org/wireshark/1679A7" },
      { name: "Kali Linux", icon: "https://cdn.simpleicons.org/kalilinux/557C94" },
      { name: "Nmap",      icon: "https://cdn.simpleicons.org/nmap/0E83CD" },
      { name: "Burp Suite", icon: "https://cdn.simpleicons.org/burpsuite/FF6633" },
    ],
  },
  {
    category: "Data & Backend", color: "#facc15", description: "Data & storage",
    summary: "SQL for data querying, basic backend scripting and API work with Next.js routes.",
    skills: [
      { name: "SQL",       icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { name: "SQLite",    icon: "https://cdn.simpleicons.org/sqlite/003B57" },
      { name: "Node.js",   icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { name: "REST APIs", icon: "https://cdn.simpleicons.org/fastapi/009688" },
    ],
  },
];

function SkillNode({ skill, color, delay, inView }: { skill: { name: string; icon: string }; color: string; delay: number; inView: boolean; }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        padding: "14px 12px 10px",
        border: `1px solid ${hovered ? color + "50" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 6,
        background: hovered ? `${color}0a` : "rgba(255,255,255,0.02)",
        cursor: "default", transition: "all 0.2s",
        boxShadow: hovered ? `0 0 18px ${color}18` : "none",
        flex: "1 1 64px", minWidth: 64,
      }}
    >
      <img src={skill.icon} alt={skill.name} width={26} height={26} style={{ objectFit: "contain", filter: hovered ? "brightness(1.2)" : "brightness(0.6)", transition: "filter 0.2s" }} />
      <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: hovered ? color : "rgba(200,200,216,0.5)", whiteSpace: "nowrap", transition: "color 0.2s" }}>
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCat, setHoveredCat] = useState<number | null>(null);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as number[] },
  });

  const totalSkills = TREE.reduce((a, c) => a + c.skills.length, 0);

  return (
    <>
      <style>{`
        .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        @media (max-width: 900px) { .skills-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 520px) { .skills-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <section id="skills" ref={ref} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "radial-gradient(ellipse 60% 55% at 50% 40%, rgba(10,10,20,1) 0%, rgba(6,6,8,1) 60%, #020204 100%)" }}>
        <div style={{ position: "absolute", width: 800, height: 500, background: "radial-gradient(ellipse at 50% 50%, rgba(224,242,254,0.04) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(2,2,4,0.6) 100%)" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px clamp(20px, 5vw, 48px)", position: "relative", zIndex: 1, width: "100%" }}>

          <motion.div {...fadeUp(0)} style={{ marginBottom: 40, paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(200,200,216,0.45)", marginBottom: 12 }}>
              <span style={{ width: 24, height: 1, background: "rgba(224,242,254,0.2)", display: "inline-block" }} />
              02 / 04
            </div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <h2 style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(32px,4vw,56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, margin: 0 }}>
                My <span style={{ color: "#e0f2fe" }}>stack</span>
              </h2>
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(200,200,216,0.35)" }}>{totalSkills} tools</span>
            </div>
          </motion.div>

          <div className="skills-grid">
            {TREE.map((cat, ci) => (
              <motion.div key={cat.category} {...fadeUp(0.1 + ci * 0.08)}
                onMouseEnter={() => setHoveredCat(ci)} onMouseLeave={() => setHoveredCat(null)}
                style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${hoveredCat === ci ? cat.color + "28" : "rgba(255,255,255,0.06)"}`, borderRadius: 6, padding: "24px", transition: "border-color 0.25s", display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: cat.color, boxShadow: hoveredCat === ci ? `0 0 8px ${cat.color}` : "none", display: "inline-block", transition: "box-shadow 0.25s", flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--font-syne)", fontSize: 14, fontWeight: 700, color: hoveredCat === ci ? cat.color : "#efefef", transition: "color 0.25s" }}>{cat.category}</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(200,200,216,0.3)" }}>{cat.skills.length} tools</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, color: "rgba(200,200,216,0.4)", lineHeight: 1.6, letterSpacing: "0.02em", margin: 0 }}>{cat.summary}</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {cat.skills.map((skill, si) => (
                    <SkillNode key={skill.name} skill={skill} color={cat.color} delay={0.15 + ci * 0.08 + si * 0.05} inView={inView} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}