
function Pricing() {
  return (
    <div className="container mt-5 mb-5 home-reveal">
      <div className="row">

        {/* Left half */}
        <div className="col-12 col-md-4 mb-4 mb-md-0">
          <h4 className="mb-2">Unbeatable pricing</h4>

          <p className="mb-3">
            We pioneered the concept of discount broking and price
            transparency in India. Flat fees and no hidden charges.
          </p>

          <a href="/" className="text-decoration-none">
            See pricing <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="d-none d-md-block col-md-2"></div>

        {/* Right half */}
        <div className="col-12 col-md-6">
          <div className="row">

            {/* Free account opening */}
            <div className="col-12 col-sm-4 mb-3 mb-sm-0">
              <div className="d-flex align-items-start">
                <span className="text-warning fs-5">₹</span>

                <h1 className="text-warning display-4 mb-0">0</h1>

                <p className="ms-2 mt-3 text-secondary">
                  Free account
                  <br />
                  opening
                </p>
              </div>
            </div>

            {/* Free equity delivery */}
            <div className="col-12 col-sm-4 mb-3 mb-sm-0">
              <div className="d-flex align-items-start">
                <span className="text-warning fs-5">₹</span>

                <h1 className="text-warning display-4 mb-0">0</h1>

                <p className="ms-2 mt-3 text-secondary">
                  Free equity delivery
                  <br />
                  and direct mutual funds
                </p>
              </div>
            </div>

            {/* Intraday */}
            <div className="col-12 col-sm-4">
              <div className="d-flex align-items-start">
                <span className="text-warning fs-5">₹</span>

                <h1 className="text-warning display-4 mb-0">20</h1>

                <p className="ms-2 mt-3 text-secondary">
                  Intraday and
                  <br />
                  F&O
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Pricing;