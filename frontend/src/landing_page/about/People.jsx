function People() {
  return (
    <div className="container people-section">

      {/* Heading */}
      <h2 className="mb-5 text-center">People</h2>

      {/* Nithin Kamath Section */}
      <div className="row align-items-center mb-5">

        {/* Image */}
        <div className="col-md-6 text-center">
          <img
            src="https://zerodha.com/static/images/nithin-kamath.jpg"
            alt="Nithin Kamath"
            className="people-img"
          />

          <h5 className="mt-4" style={{ opacity: 0.8 }}>
            Nithin Kamath
          </h5>

          <p className="text-muted">
            Founder, CEO
          </p>
        </div>

        {/* Description */}
        <div className="col-md-6">
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
      <div className="row text-center">

        {/* Nikhil */}
        <div className="col-md-4 mb-5">
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
        </div>


        {/* Kailash */}
        <div className="col-md-4 mb-5">
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
        </div>


        {/* Venu */}
        <div className="col-md-4 mb-5">
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
        </div>


        {/* Seema Patil */}
<div className="col-md-4 mb-5">
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
</div>


{/* Karthik Rangappa */}
<div className="col-md-4 mb-5">
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
</div>


{/* Austin Prakesh */}
<div className="col-md-4 mb-5">
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
</div>

      </div>

    </div>
  );
}

export default People;