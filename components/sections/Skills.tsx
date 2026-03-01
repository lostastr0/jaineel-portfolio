"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const TREE = [
  {
    category: "Frontend",
    color: "#e0f2fe",
    skills: [
      { name: "React",      icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Next.js",    icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "Tailwind",   icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "HTML/CSS",   icon: "https://cdn.simpleicons.org/html5/E34F26" },
    ],
  },
  {
    category: "Security & Dev",
    color: "#4ade80",
    skills: [
      { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "Linux",  icon: "https://cdn.simpleicons.org/linux/ffffff" },
      { name: "Bash",   icon: "https://cdn.simpleicons.org/gnubash/ffffff" },
      { name: "Git",    icon: "https://cdn.simpleicons.org/git/F05032" },
    ],
  },
  {
    category: "Environment",
    color: "#a78bfa",
    skills: [
      { name: "VS Code", icon: "https://cdn.simpleicons.org/visualstudiocode/007ACC" },
      { name: "KDE",     icon: "https://cdn.simpleicons.org/kde/1D99F3" },
      { name: "Arch",    icon: "https://cdn.simpleicons.org/archlinux/1793D1" },
      { name: "Windows", icon: "https://cdn.simpleicons.org/windows/0078D6" },
      { name: "Android", icon: "https://cdn.simpleicons.org/android/3DDC84" },
    ],
  },
  {
    category: "Daily Tools",
    color: "#fb923c",
    skills: [
      { name: "Discord", icon: "https://cdn.simpleicons.org/discord/5865F2" },
      { name: "Notion",  icon: "https://cdn.simpleicons.org/notion/ffffff" },
      { name: "Spotify", icon: "https://cdn.simpleicons.org/spotify/1DB954" },
    ],
  },
];

function SkillNode({ skill, color, delay, inView }: { skill: { name: string; icon: string }; color: string; delay: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        padding: "10px 14px",
        border: `1px solid ${hovered ? color : "rgba(255,255,255,0.08)"}`,
        borderRadius: 8,
        background: hovered ? `${color}10` : "rgba(255,255,255,0.02)",
        cursor: "default",
        transition: "all 0.25s",
        boxShadow: hovered ? `0 0 20px ${color}30` : "none",
        minWidth: 72,
      }}
    >
      <img src={skill.icon} alt={skill.name} width={28} height={28} style={{ objectFit: "contain", filter: hovered ? "brightness(1.3)" : "brightness(0.75)", transition: "filter 0.25s" }} />
      <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: hovered ? color : "#c8c8d8", whiteSpace: "nowrap", transition: "color 0.25s" }}>
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCat, setHoveredCat] = useState<number | null>(null);

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "radial-gradient(ellipse 60% 55% at 50% 40%, rgba(10,10,20,1) 0%, rgba(6,6,8,1) 60%, #020204 100%)",
      }}
    >
      <div style={{ position: "absolute", width: 800, height: 500, background: "radial-gradient(ellipse at 50% 50%, rgba(224,242,254,0.05) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(2,2,4,0.6) 100%)" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 48px", position: "relative", zIndex: 1, width: "100%" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 64, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <h2 style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
            My <span style={{ color: "#e0f2fe" }}>stack</span>
          </h2>
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b7280" }}>02 / 04</span>
        </motion.div>

        {/* Tree */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Root node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              padding: "14px 32px",
              border: "1px solid rgba(224,242,254,0.3)",
              borderRadius: 8,
              background: "rgba(224,242,254,0.06)",
              fontFamily: "var(--font-syne)",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#e0f2fe",
              boxShadow: "0 0 30px rgba(224,242,254,0.08)",
            }}
          >
            Jaineel&apos;s Stack
          </motion.div>

          {/* Line from root down */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            style={{ width: 1, height: 40, background: "rgba(255,255,255,0.1)", transformOrigin: "top" }}
          />

          {/* Horizontal connector */}
          <div style={{ position: "relative", width: "100%", height: 1, background: "rgba(255,255,255,0.1)" }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.1)", transformOrigin: "center" }}
            />
          </div>

          {/* Categories */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${TREE.length}, 1fr)`, width: "100%", gap: 16 }}>
            {TREE.map((cat, ci) => (
              <div key={cat.category} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                {/* Line down to category */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.35, delay: 0.7 + ci * 0.1 }}
                  style={{ width: 1, height: 40, background: hoveredCat === ci ? cat.color : "rgba(255,255,255,0.1)", transformOrigin: "top", transition: "background 0.3s" }}
                />

                {/* Category node */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + ci * 0.1 }}
                  onMouseEnter={() => setHoveredCat(ci)}
                  onMouseLeave={() => setHoveredCat(null)}
                  style={{
                    padding: "8px 20px",
                    border: `1px solid ${hoveredCat === ci ? cat.color : "rgba(255,255,255,0.1)"}`,
                    borderRadius: 6,
                    background: hoveredCat === ci ? `${cat.color}12` : "rgba(255,255,255,0.02)",
                    fontFamily: "var(--font-dm-mono)",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: hoveredCat === ci ? cat.color : "#c8c8d8",
                    cursor: "default",
                    transition: "all 0.25s",
                    whiteSpace: "nowrap",
                    boxShadow: hoveredCat === ci ? `0 0 20px ${cat.color}20` : "none",
                  }}
                >
                  {cat.category}
                </motion.div>

                {/* Line down to skills */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.35, delay: 1.0 + ci * 0.1 }}
                  style={{ width: 1, height: 30, background: hoveredCat === ci ? cat.color : "rgba(255,255,255,0.08)", transformOrigin: "top", transition: "background 0.3s" }}
                />

                {/* Skill nodes */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                  {cat.skills.map((skill, si) => (
                    <SkillNode
                      key={skill.name}
                      skill={skill}
                      color={cat.color}
                      delay={1.1 + ci * 0.1 + si * 0.06}
                      inView={inView}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}