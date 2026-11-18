
import { useNavigate } from "react-router-dom";
import { lazy, Suspense, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const HeroScene = lazy(() => import("./HeroScene"));

function Hero() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const isAuthenticated = Boolean(localStorage.getItem("finoraToken"));

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".finora-hero-kicker, .finora-hero-title, .finora-hero-copy, .finora-hero-actions", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out"
      });
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={heroRef} className="finora-landing-hero">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
      <div className="finora-hero-grid">
        <div className="finora-hero-content">
          <p className="finora-hero-kicker"><span></span> Markets, simplified</p>
          <h1 className="finora-hero-title">
            Your next market move,
            <span>all in one view.</span>
          </h1>
          <p className="finora-hero-copy">
            Explore live-style market insights, build a virtual watchlist, and practice confident decisions in one focused trading workspace.
          </p>
          <div className="finora-hero-actions">
            <button
              type="button"
              className="finora-primary-button"
              onClick={() => navigate(isAuthenticated ? "/trading" : "/signup")}
            >
              {isAuthenticated ? "Open trading dashboard" : "Start trading for free"}
            </button>
            <button
              type="button"
              className="finora-secondary-button"
              onClick={() => document.querySelector("#finora-experience")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore platform
            </button>
          </div>
          <div className="finora-hero-trust">
            <span>Virtual trades</span>
            <span>Real-time mindset</span>
            <span>Secure accounts</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;