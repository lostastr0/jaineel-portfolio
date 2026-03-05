"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [state, setState] = useState<"default" | "hover" | "click">("default");
  const [hidden, setHidden] = useState(true);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const x = useSpring(mouseX, { damping: 28, stiffness: 350, mass: 0.3 });
  const y = useSpring(mouseY, { damping: 28, stiffness: 350, mass: 0.3 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setHidden(false);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a, button, [role='button'], [onclick]");
      setState(isClickable ? "hover" : "default");
    };

    const onDown = () => setState("click");
    const onUp = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a, button, [role='button'], [onclick]");
      setState(isClickable ? "hover" : "default");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", () => setHidden(true));
    document.addEventListener("mouseenter", () => setHidden(false));

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const size = state === "click" ? 5 : state === "hover" ? 11 : 8;
  const bg = "#60a5fa";
  const glow = state === "click" ? "0 0 8px rgba(96,165,250,0.9)" : "0 0 14px rgba(96,165,250,0.6)";

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0,
          x, y,
          translateX: "-50%", translateY: "-50%",
          pointerEvents: "none", zIndex: 99999,
          opacity: hidden ? 0 : 1,
        }}
      >
        <motion.div
          animate={{ width: size, height: size, backgroundColor: bg, boxShadow: glow }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          style={{ borderRadius: "50%" }}
        />
      </motion.div>
    </>
  );
}