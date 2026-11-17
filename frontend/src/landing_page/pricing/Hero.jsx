

function Pricing() {
  return (
    <div className="container py-5">

      {/* Heading */}
      <div className="text-center mb-5">
        <h1>Charges</h1>

        <p className="text-muted fs-5">
          List of all charges and taxes
        </p>
      </div>


      {/* Main Pricing Cards */}
      <div className="row text-center g-4 mb-5">

        {/* Equity Delivery */}
        <div className="col-md-4">
          <div className="p-4 h-100">
            <img
              src="https://zerodha.com/static/images/pricing-eq.svg"
              alt="Equity Delivery"
              className="img-fluid mb-4"
              style={{ width: "100px", height: "100px" }}
            />

            <h4>Free equity delivery</h4>

            <p className="text-muted mt-3">
              All equity delivery investments (NSE, BSE), are absolutely
              free — ₹ 0 brokerage.
            </p>
          </div>
        </div>


        {/* Intraday & F&O */}
        <div className="col-md-4">
          <div className="p-4 h-100">
            <img
              src="https://zerodha.com/static/images/other-trades.svg"
              alt="Intraday and F&O"
              className="img-fluid mb-4"
              style={{ width: "100px", height: "100px" }}
            />

            <h4>Intraday and F&O trades</h4>

            <p className="text-muted mt-3">
              Flat ₹ 20 or 0.03% (whichever is lower) per executed order
              on intraday trades. Flat ₹20 on all option trades.
            </p>
          </div>
        </div>


        {/* Direct Mutual Funds */}
        <div className="col-md-4">
          <div className="p-4 h-100">
            <img
              src="https://zerodha.com/static/images/pricing-eq.svg"
              alt="Direct Mutual Funds"
              className="img-fluid mb-4"
              style={{ width: "100px", height: "100px" }}
            />

            <h4>Free direct MF</h4>

            <p className="text-muted mt-3">
              All direct mutual fund investments are absolutely free —
              ₹ 0 commissions & DP charges.
            </p>
          </div>
        </div>

      </div>


      {/* Brokerage Table */}
      <div className="mt-5">

        <h2 className="text-center mb-4">
          Brokerage Charges
        </h2>

        <div className="table-responsive">

          <table className="table table-bordered text-center align-middle">

            <thead className="table-light">
              <tr>
                <th></th>
                <th>Equity Delivery</th>
                <th>Equity Intraday</th>
                <th>F&O Futures</th>
                <th>F&O Options</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <th>Brokerage</th>
                <td>Zero Brokerage</td>
                <td>0.03% or ₹20/order</td>
                <td>0.03% or ₹20/order</td>
                <td>Flat ₹20/order</td>
              </tr>

              <tr>
                <th>STT / CTT</th>
                <td>0.1% on buy & sell</td>
                <td>0.025% on sell side</td>
                <td>0.05% on sell side</td>
                <td>—</td>
              </tr>

              <tr>
                <th>Transaction Charges</th>
                <td>NSE: 0.00307%</td>
                <td>NSE: 0.00307%</td>
                <td>NSE: 0.00183%</td>
                <td>NSE: 0.03553%</td>
              </tr>

              <tr>
                <th>GST</th>
                <td colSpan="4">
                  18% on brokerage + SEBI charges + transaction charges
                </td>
              </tr>

              <tr>
                <th>SEBI Charges</th>
                <td colSpan="4">
                  ₹10 / crore
                </td>
              </tr>

              <tr>
                <th>Stamp Charges</th>
                <td>0.015%</td>
                <td>0.003%</td>
                <td>0.002%</td>
                <td>0.003%</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>


      {/* Account Opening */}
      <div className="mt-5 pt-5">

        <h2 className="text-center mb-4">
          Charges for account opening
        </h2>

        <div className="table-responsive">

          <table className="table table-bordered">

            <thead className="table-light">
              <tr>
                <th>Type of account</th>
                <th>Charges</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Individual account</td>
                <td className="fw-semibold">Free</td>
              </tr>

              <tr>
                <td>Minor account</td>
                <td className="fw-semibold">Free</td>
              </tr>

              <tr>
                <td>NRI account</td>
                <td>₹500</td>
              </tr>

              <tr>
                <td>HUF account</td>
                <td>Free online / ₹500 offline</td>
              </tr>

              <tr>
                <td>Partnership, LLP & Corporate</td>
                <td>₹500</td>
              </tr>
            </tbody>

          </table>

        </div>

      </div>


      {/* AMC */}
      <div className="mt-5 pt-5">

        <h2 className="text-center mb-4">
          Demat AMC
        </h2>

        <p className="text-center text-muted mb-4">
          Free for the first year
        </p>

        <div className="table-responsive">

          <table className="table table-bordered text-center">

            <thead className="table-light">
              <tr>
                <th>Value of Holdings</th>
                <th>AMC</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Up to ₹4 lakh</td>
                <td className="fw-semibold">Free</td>
              </tr>

              <tr>
                <td>₹4 lakh – ₹10 lakh</td>
                <td>₹100/year + 18% GST</td>
              </tr>

              <tr>
                <td>Above ₹10 lakh</td>
                <td>₹300/year + 18% GST</td>
              </tr>
            </tbody>

          </table>

        </div>

      </div>


      {/* Calculator Link */}
      <div className="text-center mt-5">

        <p className="text-muted">
          Calculate your brokerage and other charges upfront.
        </p>

        <a
          href="#"
          className="text-decoration-none"
        >
          Calculate your costs upfront →
        </a>

      </div>


      {/* CTA */}
      <div className="text-center mt-5 pt-5">

        <h2>Start investing today</h2>

        <p className="text-muted">
          Open your account and start your investment journey.
        </p>

        <button className="btn btn-primary px-4 py-2">
          Sign up for free
        </button>

      </div>

    </div>
  );
}

export default Pricing;


