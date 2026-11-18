function Hero() {
  return (
    <section className="about-hero">
      <div className="about-orb about-orb-one" aria-hidden="true" />
      <div className="about-orb about-orb-two" aria-hidden="true" />
      <div className="container about-hero-inner">
        <span className="about-eyebrow">ABOUT FINORA</span>
        <h1>
          Investing forward.
          <span> Built around you.</span>
        </h1>
        <p className="about-hero-text">
          We pioneered the discount broking model in India. Now, we are
          breaking ground with technology that makes investing simpler for
          everyone.
        </p>
        <div className="about-highlights" aria-label="Finora at a glance">
          <div className="about-highlight">
            <strong>2010</strong>
            <span>Founded with a new vision</span>
          </div>
          <div className="about-highlight">
            <strong>1.8 Cr+</strong>
            <span>Investors on our platform</span>
          </div>
          <div className="about-highlight">
            <strong>15%+</strong>
            <span>Of India's retail trading volume</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;