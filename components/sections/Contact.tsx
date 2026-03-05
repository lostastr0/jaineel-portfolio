"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const EMAIL = "khatrijaineel@gmail.com";
const WORDS = ["build.", "learn.", "ship.", "grow."];

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ResumeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

function ResumeModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(2,2,4,0.85)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", padding: "20px" }}>
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{ background: "#0e0e12", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "48px 40px", maxWidth: 400, width: "100%", textAlign: "center", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 18, lineHeight: 1 }}>✕</button>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(250,204,21,0.08)", border: "1px solid rgba(250,204,21,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <span style={{ fontSize: 20 }}>🚧</span>
        </div>
        <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: "#efefef", marginBottom: 12 }}>Resume in progress</h3>
        <p style={{ fontSize: 13, lineHeight: 1.8, color: "#c8c8d8", marginBottom: 28 }}>
          My resume is currently being put together. In the meantime, feel free to reach out directly — I&apos;m happy to send it over personally.
        </p>
        <a href={`mailto:${EMAIL}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#e0f2fe", textDecoration: "none", border: "1px solid rgba(224,242,254,0.2)", padding: "10px 20px", borderRadius: 6 }}>
          <EmailIcon /> Email me instead
        </a>
      </motion.div>
    </motion.div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString("en-AU", { timeZone: "Australia/Brisbane", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setWordIndex(i => (i + 1) % WORDS.length), 2400);
    return () => clearInterval(iv);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as number[] },
  });

  return (
    <>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .contact-meta { display: flex; margin-top: 56px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06); }
        .contact-meta-item { display: flex; flex-direction: column; gap: 6px; padding: 0 32px; border-right: 1px solid rgba(255,255,255,0.06); }
        .contact-meta-item:first-child { padding-left: 0; }
        .contact-meta-item:last-child { border-right: none; }
        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .contact-meta { flex-direction: column !important; gap: 16px !important; margin-top: 36px !important; }
          .contact-meta-item { padding: 0 !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px !important; }
          .contact-meta-item:last-child { border-bottom: none !important; }
        }
      `}</style>

      <section id="contact" ref={ref} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", background: "radial-gradient(ellipse 60% 55% at 50% 40%, rgba(14,14,18,1) 0%, rgba(6,6,8,1) 60%, #020204 100%)" }}>
        <div style={{ position: "absolute", width: 800, height: 500, background: "radial-gradient(ellipse at 50% 50%, rgba(224,242,254,0.05) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(2,2,4,0.7) 100%)" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px clamp(20px, 5vw, 48px)", position: "relative", zIndex: 1, width: "100%" }}>

          {/* Header */}
          <motion.div {...fadeUp(0)} style={{ marginBottom: 40, paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(200,200,216,0.45)", marginBottom: 12 }}>
              <span style={{ width: 24, height: 1, background: "rgba(224,242,254,0.2)", display: "inline-block" }} />
              04 / 04
            </div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <h2 style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(32px,4vw,56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, margin: 0 }}>
                Get in <span style={{ color: "#e0f2fe" }}>touch</span>
              </h2>
              {time && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.12em", color: "rgba(200,200,216,0.35)", textTransform: "uppercase" }}>Brisbane</span>
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 11, color: "rgba(200,200,216,0.5)" }}>{time}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Two columns */}
          <div className="contact-grid">
            <div>
              <motion.p {...fadeUp(0.1)} style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(24px, 3.5vw, 52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#efefef", margin: "0 0 24px" }}>
                Early in my career.{" "}
                <span style={{ color: "rgba(200,200,216,0.4)" }}>Big on potential.</span>
                <br />
                Ready to{" "}
                <AnimatePresence mode="wait">
                  <motion.span key={wordIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setWordIndex(i => (i + 1) % WORDS.length)}
                    style={{ color: "#e0f2fe", cursor: "pointer", display: "inline-block" }}>
                    {WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </motion.p>
              <motion.p {...fadeUp(0.2)} style={{ fontSize: 13, lineHeight: 1.9, color: "rgba(200,200,216,0.6)", margin: "0 0 32px", maxWidth: 420 }}>
                Cyber Security student and self-taught developer based in Brisbane. Looking for internships and junior roles where I can contribute, learn fast, and build real things.
              </motion.p>
              <motion.div {...fadeUp(0.25)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 6, background: "rgba(74,222,128,0.04)", width: "fit-content" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", display: "inline-block", animation: "pulse 2s infinite", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4ade80" }}>Available for internships &amp; work</span>
              </motion.div>
            </div>

            <motion.div {...fadeUp(0.15)} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href={`mailto:${EMAIL}`} style={{ textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", background: "#e0f2fe", borderRadius: 6, cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                    <span style={{ color: "#060608", display: "flex", flexShrink: 0 }}><EmailIcon /></span>
                    <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "clamp(9px, 1.8vw, 11px)", letterSpacing: "0.06em", color: "#060608", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{EMAIL}</span>
                  </div>
                  <span style={{ color: "#060608", fontSize: 16, flexShrink: 0, marginLeft: 8 }}>↗</span>
                </div>
              </a>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { icon: <GithubIcon />, label: "GitHub", href: "https://github.com/jaineelkhatri" },
                  { icon: <LinkedInIcon />, label: "LinkedIn", href: "https://linkedin.com/in/jaineelkhatri" },
                ].map(btn => (
                  <a key={btn.label} href={btn.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, background: "rgba(255,255,255,0.02)", cursor: "pointer", transition: "all 0.2s" }}>
                      <span style={{ color: "#c8c8d8", display: "flex" }}>{btn.icon}</span>
                      <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.1em", color: "#c8c8d8" }}>{btn.label}</span>
                    </div>
                  </a>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <button onClick={copyEmail} style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", border: `1px solid ${copied ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.08)"}`, borderRadius: 6, background: copied ? "rgba(74,222,128,0.05)" : "rgba(255,255,255,0.02)", cursor: "pointer", transition: "all 0.2s" }}>
                  <span style={{ color: copied ? "#4ade80" : "#c8c8d8", display: "flex" }}>{copied ? <CheckIcon /> : <CopyIcon />}</span>
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.1em", color: copied ? "#4ade80" : "#c8c8d8" }}>{copied ? "Copied!" : "Copy email"}</span>
                </button>
                <button onClick={() => setResumeOpen(true)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, background: "rgba(255,255,255,0.02)", cursor: "pointer", transition: "all 0.2s" }}>
                  <span style={{ color: "#c8c8d8", display: "flex" }}><ResumeIcon /></span>
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.1em", color: "#c8c8d8" }}>Resume / CV</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Meta strip */}
          <motion.div {...fadeUp(0.35)} className="contact-meta">
            {[
              { k: "Based in", v: "Brisbane, QLD, AU" },
              { k: "Study",    v: "Cert IV Cyber Security" },
              { k: "Next",     v: "B.CS · QUT · 2027" },
              { k: "Email",    v: EMAIL },
            ].map(({ k, v }) => (
              <div key={k} className="contact-meta-item">
                <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(200,200,216,0.35)" }}>{k}</span>
                <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 11, color: "#efefef" }}>{v}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
      </AnimatePresence>
    </>
  );
}