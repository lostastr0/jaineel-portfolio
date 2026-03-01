"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const WORDS = ["B.CS next", "React & Next.js", "Arch Linux", "security-minded", "always shipping"];

const STATS = [
  { num: "4+", label: "Projects Built" },
  { num: "2+", label: "Years Coding" },
  { num: "3",  label: "Frameworks" },
  { num: "●",  label: "Open to Work", green: true },
];

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/jaineelkhatri" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jaineelkhatri" },
  { label: "Email",    href: "mailto:hello@jaineel.dev" },
];

const STRIP = [
  "Brisbane, QLD, AU",
  "Available for work",
  "Cert IV Cyber Security · TAFE QLD",
  "B.CS Starting 2027",
];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const iv = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % WORDS.length);
        setWordVisible(true);
      }, 320);
    }, 2400);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, raf: number;

    type P = {
      x: number; y: number; size: number;
      speedX: number; speedY: number;
      opacity: number; life: number; maxLife: number;
    };

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const makeP = (): P => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() * 1.2 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.4 - 0.1,
      opacity: Math.random() * 0.5 + 0.1,
      life: Math.floor(Math.random() * 400),
      maxLife: Math.random() * 300 + 200,
    });

    resize();
    const particles: P[] = Array.from({ length: 80 }, makeP);

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;
        const t = (p.life % p.maxLife) / p.maxLife;
        const alpha = t < 0.2 ? (t / 0.2) * p.opacity : t > 0.8 ? ((1 - t) / 0.2) * p.opacity : p.opacity;
        if (p.life >= p.maxLife || p.y < -10) Object.assign(p, makeP(), { life: 0 });
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,235,255,${alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    animate();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
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
    const onLeave = () => {
      name.style.transition = "transform 0.6s ease";
      name.style.transform = "rotateX(22deg) rotateY(0deg)";
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as number[] },
  });

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "radial-gradient(ellipse 60% 55% at 50% 40%, rgba(18,18,36,1) 0%, rgba(8,8,16,1) 55%, #020204 100%)",
        paddingTop: 60,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1, opacity: 0.7 }}
      />
      <div style={{ position: "absolute", width: 900, height: 500, background: "radial-gradient(ellipse at 50% 45%, rgba(224,242,254,0.09) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-55%)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(2,2,4,0.7) 100%)" }} />

      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", flex: 1, justifyContent: "center", width: "100%", padding: "0 48px" }}>

        <motion.div {...fadeUp(0.1)} style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8c8d8", marginBottom: 28 }}>
          <span style={{ width: 24, height: 1, background: "rgba(224,242,254,0.25)", display: "inline-block" }} />
          Student. Developer. Builder.
          <span style={{ width: 24, height: 1, background: "rgba(224,242,254,0.25)", display: "inline-block" }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 800, perspectiveOrigin: "50% 50%", width: "100%" }}
        >
          <div ref={nameRef} style={{ transformStyle: "preserve-3d", transform: "rotateX(22deg)", lineHeight: 0.82, letterSpacing: "-0.05em", textAlign: "center" }}>
            <span style={{ display: "block", fontFamily: "var(--font-syne)", fontSize: "clamp(72px,13vw,192px)", fontWeight: 800, color: "#efefef", whiteSpace: "nowrap" }}>
              JAINEEL
            </span>
            <span style={{ display: "block", fontFamily: "var(--font-syne)", fontSize: "clamp(72px,13vw,192px)", fontWeight: 800, color: "transparent", WebkitTextStroke: "2px #e0f2fe", filter: "drop-shadow(0 0 40px rgba(224,242,254,0.2))", whiteSpace: "nowrap" }}>
              KHATRI
            </span>
          </div>
        </motion.div>

        <motion.p {...fadeUp(0.5)} style={{ marginTop: 32, fontSize: "clamp(13px,1.4vw,17px)", color: "#c8c8d8", letterSpacing: "0.04em" }}>
          Cert IV now.{" "}
          <span style={{
            color: "#e0f2fe", fontWeight: 600,
            opacity: wordVisible ? 1 : 0,
            transform: wordVisible ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 0.3s, transform 0.3s",
            display: "inline-block",
          }}>
            {WORDS[wordIdx]}
          </span>
          {" "}Building everything in between.
        </motion.p>

        <motion.div {...fadeUp(0.65)} style={{ display: "flex", marginTop: 40, border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: "14px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <span style={{ fontSize: 22, fontWeight: 800, lineHeight: 1, color: s.green ? "#4ade80" : "#efefef", fontFamily: "var(--font-syne)" }}>{s.num}</span>
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: s.green ? "#4ade80" : "#c8c8d8" }}>{s.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.8)} style={{ display: "flex", gap: 8, marginTop: 32 }}>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#c8c8d8", padding: "9px 18px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2, textDecoration: "none" }}>
              {s.label}
            </a>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.95)} style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <a href="#projects" style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", padding: "13px 26px", borderRadius: 2, background: "#e0f2fe", color: "#060608", fontWeight: 600, textDecoration: "none" }}>
            View work
          </a>
          <a href="#contact" style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", padding: "13px 26px", borderRadius: 2, background: "transparent", color: "#c8c8d8", border: "1px solid rgba(255,255,255,0.15)", textDecoration: "none" }}>
            Contact
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        style={{ position: "relative", zIndex: 10, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 32, padding: "16px 48px", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}
      >
        {STRIP.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: item === "Available for work" ? "#e0f2fe" : "#c8c8d8" }}>
              {item}
            </span>
            {i < STRIP.length - 1 && <span style={{ width: 1, height: 20, background: "rgba(255,255,255,0.06)", display: "inline-block" }} />}
          </div>
        ))}
      </motion.div>
{/* Scroll indicator */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.4, duration: 1.2 }}
  style={{
    position: "absolute",
    bottom: 90,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
  }}
>
  <div style={{
    width: 20,
    height: 32,
    border: "2px solid rgba(224,242,254,0.25)",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    paddingTop: 5,
  }}>
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: 4,
        height: 4,
        borderRadius: "50%",
        background: "#e0f2fe",
        boxShadow: "0 0 6px rgba(224,242,254,0.8)",
      }}
    />
  </div>
</motion.div>
    </section>
  );
}