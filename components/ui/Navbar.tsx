"use client";
import { useEffect, useState } from "react";

const links = ["about", "skills", "projects", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      height: 60, padding: "0 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      background: scrolled ? "rgba(6,6,8,0.92)" : "transparent",
      backdropFilter: "blur(20px)",
      transition: "background 0.3s",
    }}>
      <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.01em", fontFamily: "var(--font-syne)" }}>
        Jaineel<span style={{ color: "#e0f2fe" }}>.</span>
      </span>

      <ul style={{ display: "flex", gap: 40, listStyle: "none", margin: 0, padding: 0 }}>
        {links.map((id) => (
          <li key={id}>
            <a href={`#${id}`} style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: 10, letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: active === id ? "#e0f2fe" : "#c8c8d8",
              textDecoration: "none",
              transition: "color 0.2s",
            }}>
              {id}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.12em", color: "#c8c8d8" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80", display: "inline-block", animation: "pulse 2.5s ease infinite" }} />
        Available for work
      </div>
    </nav>
  );
}