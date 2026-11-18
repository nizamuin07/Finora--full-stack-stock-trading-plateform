function People() {
  return (
    <section className="people-section">
      <div className="container">
      <div className="about-section-heading text-center">
        <span className="about-eyebrow">THE PEOPLE BEHIND FINORA</span>
        <h2>Meet the team</h2>
        <p>Building thoughtful tools for a more confident investing journey.</p>
      </div>

      {/* Nithin Kamath Section */}
      <div className="row align-items-center mb-5 about-lead-card">

        {/* Image */}
        <div className="col-md-5 text-center">
          <img
            src="https://zerodha.com/static/images/nithin-kamath.jpg"
            alt="Nithin Kamath"
            className="people-img"
          />

          <h5 className="mt-4">
            Nithin Kamath
          </h5>

          <p className="text-muted">
            Founder, CEO
          </p>
        </div>

        {/* Description */}
        <div className="col-md-7">
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome
            the hurdles he faced during his decade long stint as a trader.
            Today, Zerodha has changed the landscape of the Indian broking
            industry.
          </p>

          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>

          <p>
            Playing basketball is his zen.
          </p>

          <p>
            Connect on{" "}
            <a href="#">Homepage</a> /{" "}
            <a href="#">TradingQnA</a> /{" "}
            <a href="#">Twitter</a>
          </p>
        </div>

      </div>


      {/* Other People */}
      <div className="row g-4 text-center">

        {/* Nikhil */}
        <div className="col-md-4">
          <article className="person-card">
          <img
            src="https://zerodha.com/static/images/Nikhil.jpg"
            alt="Nikhil Kamath"
            className="people-img"
          />

          <h5 className="mt-4">
            Nikhil Kamath
          </h5>

          <p className="text-muted">
            Co-founder & CFO
          </p>

          <a href="#">
            Bio
          </a>
          </article>
        </div>


        {/* Kailash */}
        <div className="col-md-4">
          <article className="person-card">
          <img
            src="https://zerodha.com/static/images/Kailash.jpg"
            alt="Dr. Kailash Nadh"
            className="people-img"
          />

          <h5 className="mt-4">
            Dr. Kailash Nadh
          </h5>

          <p className="text-muted">
            CTO
          </p>

          <a href="#">
            Bio
          </a>
          </article>
        </div>


        {/* Venu */}
        <div className="col-md-4">
          <article className="person-card">
          <img
            src="https://zerodha.com/static/images/Venu.jpg"
            alt="Venu Madhav"
            className="people-img"
          />

          <h5 className="mt-4">
            Venu Madhav
          </h5>

          <p className="text-muted">
            COO
          </p>

          <a href="#">
            Bio
          </a>
          </article>
        </div>


        {/* Seema Patil */}
<div className="col-md-4">
  <article className="person-card">
  <img
    src="https://zerodha.com/static/images/Seema.jpg"
    alt="Seema Patil"
    className="people-img"
  />

  <h5 className="mt-4">Seema Patil</h5>

  <p className="text-muted">
    Director
  </p>

  <a href="#">Bio</a>
  </article>
</div>


{/* Karthik Rangappa */}
<div className="col-md-4">
  <article className="person-card">
  <img
    src="https://zerodha.com/static/images/karthik.jpg"
    alt="Karthik Rangappa"
    className="people-img"
  />

  <h5 className="mt-4">Karthik Rangappa</h5>

  <p className="text-muted">
    Chief of Education
  </p>

  <a href="#">Bio</a>
  </article>
</div>


{/* Austin Prakesh */}
<div className="col-md-4">
  <article className="person-card">
  <img
    src="https://zerodha.com/static/images/Austin.jpg"
    alt="Austin Prakesh"
    className="people-img"
  />

  <h5 className="mt-4">Austin Prakesh</h5>

  <p className="text-muted">
    Director Strategy
  </p>

  <a href="#">Bio</a>
  </article>
</div>

      </div>

      </div>
    </section>
  );
}

export default People;