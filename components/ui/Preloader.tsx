"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION = 2200; // total ms

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [showTag, setShowTag] = useState(false);

  // Tick counter — eases in fast, slows near 100
  useEffect(() => {
    const start = Date.now();
    const iv = setInterval(() => {
      const t = Math.min((Date.now() - start) / DURATION, 1);
      // Ease out cubic — fast start, slow finish
      const eased = 1 - Math.pow(1 - t, 3);
      const val = Math.floor(eased * 100);
      setCount(val);
      if (t >= 1) clearInterval(iv);
    }, 16);
    return () => clearInterval(iv);
  }, []);

  // Show name tag slightly after start
  useEffect(() => {
    const t = setTimeout(() => setShowTag(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Begin exit
  useEffect(() => {
    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 800);
    }, DURATION + 300);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#020204",
            display: "flex", flexDirection: "column",
            alignItems: "flex-start", justifyContent: "flex-end",
            padding: "clamp(32px, 6vw, 64px)",
            overflow: "hidden",
          }}
        >
          {/* Subtle radial glow behind the number */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600, height: 600,
            background: "radial-gradient(ellipse at center, rgba(224,242,254,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Top-left name tag */}
          <AnimatePresence>
            {showTag && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: "absolute", top: "clamp(32px, 6vw, 64px)", left: "clamp(32px, 6vw, 64px)" }}
              >
                <span style={{
                  fontFamily: "var(--font-syne, sans-serif)",
                  fontSize: 15, fontWeight: 800,
                  letterSpacing: "-0.02em", color: "#efefef",
                }}>
                  Jaineel<span style={{ color: "#e0f2fe" }}>.</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Top-right status */}
          <AnimatePresence>
            {showTag && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ position: "absolute", top: "clamp(32px, 6vw, 64px)", right: "clamp(32px, 6vw, 64px)", display: "flex", alignItems: "center", gap: 7 }}
              >
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80", display: "inline-block", animation: "plsPulse 2s ease-in-out infinite" }} />
                <span style={{ fontFamily: "var(--font-dm-mono, monospace)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4ade80" }}>
                  Loading
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Big counter — bottom left */}
          <div style={{ position: "relative", lineHeight: 1, userSelect: "none" }}>
            <motion.span
              key={count}
              style={{
                display: "block",
                fontFamily: "var(--font-syne, sans-serif)",
                fontSize: "clamp(96px, 22vw, 280px)",
                fontWeight: 800,
                letterSpacing: "-0.06em",
                color: "transparent",
                WebkitTextStroke: `1px rgba(224,242,254,${0.08 + (count / 100) * 0.22})`,
                lineHeight: 0.85,
                transition: "none",
              }}
            >
              {String(count).padStart(2, "0")}
            </motion.span>

            {/* Solid fill layered on top, clips up as count increases */}
            <span
              style={{
                position: "absolute", inset: 0,
                fontFamily: "var(--font-syne, sans-serif)",
                fontSize: "clamp(96px, 22vw, 280px)",
                fontWeight: 800,
                letterSpacing: "-0.06em",
                color: "#efefef",
                lineHeight: 0.85,
                clipPath: `inset(0 ${100 - count}% 0 0)`,
                transition: "clip-path 0.05s linear",
                pointerEvents: "none",
              }}
            >
              {String(count).padStart(2, "0")}
            </span>
          </div>

          {/* % sign + label row */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginTop: 20 }}>
            <span style={{
              fontFamily: "var(--font-dm-mono, monospace)",
              fontSize: "clamp(13px, 2vw, 18px)",
              color: "rgba(200,200,216,0.3)",
              letterSpacing: "0.04em",
            }}>
              %
            </span>
            <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.08)" }} />
            <span style={{
              fontFamily: "var(--font-dm-mono, monospace)",
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(200,200,216,0.3)",
            }}>
              Portfolio · v1.0.0
            </span>
          </div>

          {/* Progress line — bottom edge */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.04)" }}>
            <div style={{
              height: "100%",
              width: `${count}%`,
              background: "linear-gradient(90deg, rgba(224,242,254,0.2), rgba(224,242,254,0.6))",
              transition: "width 0.05s linear",
            }} />
          </div>

          {/* Bottom-right — Brisbane */}
          <span style={{
            position: "absolute", bottom: "clamp(32px, 6vw, 64px)", right: "clamp(32px, 6vw, 64px)",
            fontFamily: "var(--font-dm-mono, monospace)", fontSize: 9,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(200,200,216,0.2)",
          }}>
            Brisbane, AU
          </span>

          <style>{`
            @keyframes plsPulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}