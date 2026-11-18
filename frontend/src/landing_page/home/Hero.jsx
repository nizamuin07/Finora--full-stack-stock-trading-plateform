
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
          <p className="finora-hero-kicker"><span></span> The intelligent trading workspace</p>
          <h1 className="finora-hero-title">
            Your next market move,
            <span>starts with clarity.</span>
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

        <div className="finora-market-preview">
          <div className="market-preview-glow"></div>
          <div className="market-preview-card">
            <div className="market-preview-head">
              <div>
                <span>Portfolio overview</span>
                <strong>₹4,82,650</strong>
              </div>
              <span className="market-preview-live"><i></i> Live</span>
            </div>

            <div className="market-preview-chart">
              <div className="chart-y-labels"><span>₹5L</span><span>₹4L</span><span>₹3L</span></div>
              <svg viewBox="0 0 520 210" role="img" aria-label="Growing portfolio chart">
                <defs>
                  <linearGradient id="finoraChartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#58d2a3" stopOpacity=".38" />
                    <stop offset="100%" stopColor="#58d2a3" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path className="market-chart-grid" d="M0 50H520M0 105H520M0 160H520" />
                <path className="market-chart-area" d="M0 158 C42 150 48 130 78 138 C110 146 120 112 148 118 C182 126 194 82 225 92 C260 102 274 72 305 80 C344 90 356 44 392 58 C425 68 462 30 520 38 L520 210 L0 210 Z" />
                <path className="market-chart-line" d="M0 158 C42 150 48 130 78 138 C110 146 120 112 148 118 C182 126 194 82 225 92 C260 102 274 72 305 80 C344 90 356 44 392 58 C425 68 462 30 520 38" />
              </svg>
              <span className="chart-up-label">+12.48%</span>
            </div>

            <div className="market-preview-stocks">
              <div><span className="stock-symbol reliance">R</span><p><strong>RELIANCE</strong><small>₹2,842.40</small></p><em>+1.24%</em></div>
              <div><span className="stock-symbol tcs">T</span><p><strong>TCS</strong><small>₹3,618.70</small></p><em>+0.86%</em></div>
              <div><span className="stock-symbol hdfc">H</span><p><strong>HDFCBANK</strong><small>₹1,664.25</small></p><em className="down">-0.32%</em></div>
            </div>
          </div>

          <div className="market-float-card market-float-left">
            <span>Today's return</span>
            <strong>+₹8,420</strong>
            <small>+2.18%</small>
          </div>
          <div className="market-float-card market-float-right">
            <span>Market status</span>
            <strong><i></i> Market open</strong>
          </div>
        </div>
      </div>

      <div className="finora-market-ticker" aria-label="Sample market prices">
        <div><span>NIFTY 50</span><strong>24,768.35</strong><em>+0.48%</em></div>
        <div><span>SENSEX</span><strong>81,224.75</strong><em>+0.39%</em></div>
        <div><span>NIFTY BANK</span><strong>52,942.10</strong><em>+0.62%</em></div>
        <div><span>INDIA VIX</span><strong>13.42</strong><em className="ticker-down">-1.10%</em></div>
      </div>
    </section>
  );
}

export default Hero;