"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Preloader from "@/components/ui/Preloader";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

export default function Page() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [loaded]);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </>
  );
}