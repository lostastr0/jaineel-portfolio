"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const WORDS = ["B.CS next", "React & Next.js", "Arch Linux", "security-minded", "always shipping"];
const STATS = [
  { num: "4+", label: "Projects Built" },
  { num: "2+", label: "Years Coding" },
  { num: "3",  label: "Frameworks" },
];

type Status = { label: string; color: string; glow: string; };

function useStatus(): Status {
  const [status, setStatus] = useState<Status>({ label: "Free", color: "#4ade80", glow: "#4ade80" });
  useEffect(() => {
    const update = () => {
      const bne = new Date(new Date().toLocaleString("en-US", { timeZone: "Australia/Brisbane" }));
      const h = bne.getHours();
      const day = bne.getDay(); // 0=Sun, 6=Sat

      if (h < 7 || h >= 23) {
        // Everyone's asleep
        setStatus({ label: "Offline", color: "rgba(200,200,216,0.5)", glow: "rgba(200,200,216,0.3)" });
      } else if (day === 6 && h >= 8 && h < 17) {
        // Saturday day shift
        setStatus({ label: "Busy", color: "#facc15", glow: "#facc15" });
      } else if (day !== 0 && day !== 6 && h >= 8 && h < 14) {
        // Weekday class hours
        setStatus({ label: "In class", color: "#818cf8", glow: "#818cf8" });
      } else {
        // Everything else — weekday evenings, Sunday, Saturday evening
        setStatus({ label: "Free", color: "#4ade80", glow: "#4ade80" });
      }
    };
    update();
    const iv = setInterval(update, 60000);
    return () => clearInterval(iv);
  }, []);
  return status;
}
const STRIP_ITEMS = [
  { text: "Brisbane, QLD, AU" },
  { text: "◆" },
  { text: "Cert IV Cyber Security · TAFE QLD" },
  { text: "◆" },
  { text: "B.CS Starting 2027" },
  { text: "◆" },
  { text: "React · Next.js · TypeScript" },
  { text: "◆" },
  { text: "Arch Linux · KDE" },
  { text: "◆" },
  { text: "Open to internships & work" },
  { text: "◆" },
];
const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#$@%&";

function useGlitch(text: string) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number>();
  const iterRef = useRef(0);
  const trigger = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    iterRef.current = 0;
    const maxIter = text.length * 3;
    const step = () => {
      iterRef.current++;
      setDisplay(text.split("").map((ch, i) => {
        if (ch === " ") return " ";
        if (i < iterRef.current / 3) return text[i];
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }).join(""));
      if (iterRef.current < maxIter) { rafRef.current = requestAnimationFrame(step); } else { setDisplay(text); }
    };
    rafRef.current = requestAnimationFrame(step);
  }, [text]);
  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);
  return { display, trigger };
}

type SpotifyData = { playing: boolean; title: string | null; artist?: string; albumArt?: string; url?: string; };

function SpotifyWidget() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try { const res = await fetch("/api/spotify"); if (res.ok) setData(await res.json()); } catch {}
    };
    fetchData();
    const iv = setInterval(fetchData, 30000);
    return () => clearInterval(iv);
  }, []);
  if (!data?.title) return null;
  return (
    <motion.a href={data.url || "https://open.spotify.com"} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position: "absolute", bottom: 80, left: 24, zIndex: 20, display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", border: `1px solid ${hovered ? "rgba(30,215,96,0.3)" : "rgba(255,255,255,0.06)"}`, borderRadius: 4, background: hovered ? "rgba(30,215,96,0.06)" : "rgba(6,6,8,0.85)", backdropFilter: "blur(12px)", cursor: "pointer", transition: "all 0.2s", textDecoration: "none", maxWidth: 220 }}
    >
      {data.albumArt && <img src={data.albumArt} alt="album" style={{ width: 36, height: 36, borderRadius: 3, flexShrink: 0, objectFit: "cover" }} />}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 1.5, height: 10, flexShrink: 0 }}>
            {[1, 0.5, 0.8, 0.3].map((h, i) => (
              <motion.div key={i} animate={data.playing ? { scaleY: [h, 0.2, h * 0.8, 1, h] } : { scaleY: 0.3 }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                style={{ width: 2.5, height: 10, borderRadius: 2, background: "#1ed760", transformOrigin: "bottom" }} />
            ))}
          </div>
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 8, color: "#1ed760", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {data.playing ? "Now playing" : "Last played"}
          </span>
        </div>
        <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, color: "#efefef", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{data.title}</div>
        <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, color: "#c8c8d8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{data.artist}</div>
      </div>
    </motion.a>
  );
}

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [emailCopied, setEmailCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { display: jaineel, trigger: triggerJ } = useGlitch("JAINEEL");
  const { display: khatri, trigger: triggerK } = useGlitch("KHATRI");
  const status = useStatus();

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@jaineel.dev");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  useEffect(() => {
    const iv = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => { setWordIdx((i) => (i + 1) % WORDS.length); setWordVisible(true); }, 320);
    }, 2400);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, raf: number;
    type P = { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number; life: number; maxLife: number; };
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    const makeP = (): P => ({ x: Math.random() * W, y: Math.random() * H, size: Math.random() * 1.2 + 0.3, speedX: (Math.random() - 0.5) * 0.3, speedY: -Math.random() * 0.4 - 0.1, opacity: Math.random() * 0.5 + 0.1, life: Math.floor(Math.random() * 400), maxLife: Math.random() * 300 + 200 });
    resize();
    const particles: P[] = Array.from({ length: 80 }, makeP);
    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.speedX; p.y += p.speedY; p.life++;
        const t = (p.life % p.maxLife) / p.maxLife;
        const alpha = t < 0.2 ? (t / 0.2) * p.opacity : t > 0.8 ? ((1 - t) / 0.2) * p.opacity : p.opacity;
        if (p.life >= p.maxLife || p.y < -10) Object.assign(p, makeP(), { life: 0 });
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,235,255,${alpha})`; ctx.fill();
      });
      raf = requestAnimationFrame(animate);
    };
    window.addEventListener("resize", resize);
    animate();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const name = nameRef.current;
    if (!hero || !name) return;
    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = hero.getBoundingClientRect();
      const nx = ((e.clientX - left) / width - 0.5) * 2;
      const ny = ((e.clientY - top) / height - 0.5) * 2;
      name.style.transition = "";
      name.style.transform = `rotateX(${22 + ny * -4}deg) rotateY(${nx * 6}deg)`;
    };
    const onLeave = () => { name.style.transition = "transform 0.6s ease"; name.style.transform = "rotateX(22deg) rotateY(0deg)"; };
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => { hero.removeEventListener("mousemove", onMove); hero.removeEventListener("mouseleave", onLeave); };
  }, []);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as number[] },
  });

  return (
    <section ref={heroRef} style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "radial-gradient(ellipse 60% 55% at 50% 40%, rgba(18,18,36,1) 0%, rgba(8,8,16,1) 55%, #020204 100%)", paddingTop: 60 }}>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1, opacity: 0.7 }} />
      <div style={{ position: "absolute", width: 900, height: 500, background: "radial-gradient(ellipse at 50% 45%, rgba(224,242,254,0.09) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-55%)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(2,2,4,0.7) 100%)" }} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        style={{ position: "absolute", top: 80, left: 24, zIndex: 20, fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.15em", color: "rgba(200,200,216,0.35)", textTransform: "uppercase" }}>
        v1.0.0
      </motion.div>

      <SpotifyWidget />

      {/* Centre content */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", flex: 1, justifyContent: "center", width: "100%", padding: "0 24px" }}>

        <motion.div {...fadeUp(0.1)} style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8c8d8", marginBottom: 24 }}>
          <span style={{ width: 24, height: 1, background: "rgba(224,242,254,0.25)", display: "inline-block" }} />
          Student. Developer. Builder.
          <span style={{ width: 24, height: 1, background: "rgba(224,242,254,0.25)", display: "inline-block" }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 800, perspectiveOrigin: "50% 50%", width: "100%" }}
          onMouseEnter={() => { triggerJ(); triggerK(); }}>
          <div ref={nameRef} style={{ transformStyle: "preserve-3d", transform: "rotateX(22deg)", lineHeight: 0.82, letterSpacing: "-0.05em", textAlign: "center", cursor: "default" }}>
            <span style={{ display: "block", fontFamily: "var(--font-syne)", fontSize: "clamp(72px,13vw,192px)", fontWeight: 800, color: "#efefef", whiteSpace: "nowrap" }}>{jaineel}</span>
            <span style={{ display: "block", fontFamily: "var(--font-syne)", fontSize: "clamp(72px,13vw,192px)", fontWeight: 800, color: "transparent", WebkitTextStroke: "2px #e0f2fe", filter: "drop-shadow(0 0 40px rgba(224,242,254,0.2))", whiteSpace: "nowrap" }}>{khatri}</span>
          </div>
        </motion.div>

        <motion.p {...fadeUp(0.5)} style={{ marginTop: 28, fontSize: "clamp(13px,1.4vw,17px)", color: "#c8c8d8", letterSpacing: "0.04em" }}>
          Cert IV now.{" "}
          <span style={{ color: "#e0f2fe", fontWeight: 600, opacity: wordVisible ? 1 : 0, transform: wordVisible ? "translateY(0)" : "translateY(-8px)", transition: "opacity 0.3s, transform 0.3s", display: "inline-block", minWidth: "130px" }}>
            {WORDS[wordIdx]}
          </span>
          {" "}Building everything in between.
        </motion.p>

        {/* Stats */}
        <motion.div {...fadeUp(0.65)} style={{ display: "flex", marginTop: 36 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: "0 36px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
              <span style={{ fontSize: 28, fontWeight: 800, lineHeight: 1, color: "#efefef", fontFamily: "var(--font-syne)" }}>{s.num}</span>
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(200,200,216,0.5)" }}>{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Status + availability line */}
        <motion.div {...fadeUp(0.7)} style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
          <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.1)", display: "inline-block" }} />
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: status.color, boxShadow: `0 0 7px ${status.glow}`, display: "inline-block", flexShrink: 0, animation: status.label !== "Offline" ? "pulse 2s infinite" : "none" }} />
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: status.color }}>{status.label}</span>
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, color: "rgba(200,200,216,0.3)" }}>·</span>
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#e0f2fe", borderBottom: "1px solid rgba(224,242,254,0.25)", paddingBottom: 1 }}>Seeking internships &amp; work</span>
          <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.1)", display: "inline-block" }} />
        </motion.div>

        {/* Thin divider */}
        <motion.div {...fadeUp(0.75)} style={{ width: 40, height: 1, background: "rgba(255,255,255,0.08)", marginTop: 28 }} />

        {/* Buttons */}
        <motion.div {...fadeUp(0.85)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: 28 }}>
          {/* Row 1 — primary */}
          <div style={{ display: "flex", gap: 8 }}>
            <a href="#projects" style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", padding: "14px 32px", borderRadius: 2, background: "#e0f2fe", color: "#060608", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              View work <span style={{ fontSize: 13 }}>↗</span>
            </a>
            <a href="#contact" style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", padding: "14px 32px", borderRadius: 2, background: "transparent", color: "#efefef", border: "1px solid rgba(255,255,255,0.15)", textDecoration: "none" }}>
              Get in touch
            </a>
          </div>
          {/* Row 2 — secondary */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <a href="https://github.com/jaineelkhatri" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", padding: "9px 16px", borderRadius: 2, background: "transparent", color: "rgba(200,200,216,0.6)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none" }}>
              GitHub
            </a>
            <a href="https://linkedin.com/in/jaineelkhatri" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", padding: "9px 16px", borderRadius: 2, background: "transparent", color: "rgba(200,200,216,0.6)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none" }}>
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom strip — marquee */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }}
        style={{ position: "relative", zIndex: 10, width: "100%", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0, overflow: "hidden" }}>
        <style>{`
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        `}</style>
        <div style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap", animation: "marquee 28s linear infinite", padding: "14px 0" }}>
          {[...STRIP_ITEMS, ...STRIP_ITEMS].map((item, i) => (
            <span key={i} style={{
              fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
              color: item.text === "◆" ? "rgba(255,255,255,0.12)" : item.text === "Open to internships & work" ? "#e0f2fe" : "rgba(200,200,216,0.5)",
              padding: item.text === "◆" ? "0 20px" : "0 0",
              marginRight: item.text === "◆" ? 0 : 0,
            }}>
              {item.text === "Open to internships & work"
                ? <><span style={{ color: "#4ade80", marginRight: 6 }}>●</span>{item.text}</>
                : item.text}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1.2 }}
        style={{ position: "absolute", bottom: 56, left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(200,200,216,0.4)" }}>scroll</span>
        <div style={{ width: 20, height: 32, border: "2px solid rgba(224,242,254,0.25)", borderRadius: 20, display: "flex", justifyContent: "center", paddingTop: 5 }}>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 4, height: 4, borderRadius: "50%", background: "#e0f2fe", boxShadow: "0 0 6px rgba(224,242,254,0.8)" }} />
        </div>
      </motion.div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(224,242,254,0.15), rgba(224,242,254,0.3), rgba(224,242,254,0.15), transparent)", zIndex: 20 }} />
    </section>
  );
}