"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = ["about", "skills", "projects", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35 }
    );
    links.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  // Close menu on nav click
  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .nav-link { position: relative; text-decoration: none; transition: color 0.2s; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0; right: 0;
          height: 1px; background: #e0f2fe;
          transform: scaleX(0);
          transition: transform 0.2s ease;
          transform-origin: center;
        }
        .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }
        .nav-link:hover { color: #e0f2fe !important; }

        @media (max-width: 640px) {
          .nav-desktop-links { display: none !important; }
          .nav-available-badge { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 641px) {
          .nav-hamburger { display: none !important; }
        }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: 60, padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        background: scrolled || menuOpen ? "rgba(6,6,8,0.96)" : "transparent",
        backdropFilter: "blur(20px)",
        transition: "background 0.3s, border-color 0.3s",
      }}>

        {/* Logo */}
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 1 }}>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "var(--font-syne)", color: "#efefef" }}>Jaineel</span>
          <span style={{ fontSize: 20, fontWeight: 800, fontFamily: "var(--font-syne)", color: "#e0f2fe", lineHeight: 1, filter: "drop-shadow(0 0 6px rgba(224,242,254,0.6))" }}>.</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-desktop-links" style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 }}>
          {links.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className={`nav-link${active === id ? " active" : ""}`}
                style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: active === id ? "#e0f2fe" : "#c8c8d8" }}>
                {id}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop badge */}
        <div className="nav-available-badge" style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 12px", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 2, background: "rgba(74,222,128,0.04)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80", display: "inline-block", animation: "pulse 2.5s ease infinite", flexShrink: 0 }} />
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4ade80" }}>Available for work</span>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: "none", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "8px 10px", cursor: "pointer", display: "none", flexDirection: "column", gap: 4, alignItems: "center", justifyContent: "center" }}
        >
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} style={{ display: "block", width: 18, height: 1.5, background: "#c8c8d8", borderRadius: 2 }} />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} style={{ display: "block", width: 18, height: 1.5, background: "#c8c8d8", borderRadius: 2 }} />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} style={{ display: "block", width: 18, height: 1.5, background: "#c8c8d8", borderRadius: 2 }} />
        </button>
      </nav>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed", top: 60, left: 0, right: 0, zIndex: 49,
              background: "rgba(6,6,8,0.98)", backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "20px 24px 28px",
              display: "flex", flexDirection: "column", gap: 0,
            }}
          >
            {links.map((id, i) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={handleNavClick}
                style={{
                  fontFamily: "var(--font-syne)", fontSize: 22, fontWeight: 800,
                  letterSpacing: "-0.02em", textTransform: "uppercase",
                  color: active === id ? "#e0f2fe" : "rgba(200,200,216,0.5)",
                  textDecoration: "none",
                  padding: "14px 0",
                  borderBottom: i < links.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  transition: "color 0.2s",
                }}
              >
                {id}
              </a>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 20, padding: "10px 12px", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 6, background: "rgba(74,222,128,0.04)", width: "fit-content" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80", display: "inline-block", animation: "pulse 2.5s ease infinite" }} />
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4ade80" }}>Available for work</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}