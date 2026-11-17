

function Universe() {
  return (
    <div className="container py-5">

      {/* Heading */}
      <div className="text-center mb-5">
        <h1 className="mb-3">FINORA Products</h1>

        <p className="text-muted fs-5">
          Sleek, modern, and intuitive trading platforms
        </p>

        <p>
          Check out our{" "}
          <a href="#" className="text-decoration-none">
            investment offerings →
          </a>
        </p>
      </div>


      {/* ================= KITE ================= */}
      <div className="row align-items-center mb-5 pb-5 gx-5">

        <div className="col-md-6 text-center">
          <img
            src="https://zerodha.com/static/images/products-kite.png"
            alt="Kite"
            className="img-fluid"
          />
        </div>

        <div className="col-md-6">
          <h2>Kite</h2>

          <p className="text-muted">
            Our ultra-fast flagship trading platform with streaming market
            data, advanced charts, an elegant UI, and more. Enjoy the Kite
            experience seamlessly on your Android and iOS devices.
          </p>

          <div className="mt-4">
            <a href="#" className="me-4 text-decoration-none">
              Try demo →
            </a>

            <a href="#" className="text-decoration-none">
              Learn more →
            </a>
          </div>

          <div className="mt-4">
            <img
              src="https://zerodha.com/static/images/google-play-badge.svg"
              alt="Google Play"
              style={{ width: "140px" }}
              className="me-2"
            />

            <img
              src="https://zerodha.com/static/images/appstore-badge.svg"
              alt="App Store"
              style={{ width: "140px" }}
            />
          </div>
        </div>

      </div>


      {/* ================= CONSOLE ================= */}
      <div className="row align-items-center mb-5 pb-5 gx-5">

        <div className="col-md-6 order-md-2 text-center">
          <img
            src="https://zerodha.com/static/images/products-console.png"
            alt="Console"
            className="img-fluid"
          />
        </div>

        <div className="col-md-6 order-md-1">
          <h2>Console</h2>

          <p className="text-muted">
            The central dashboard for your FINORA account. Gain insights
            into your trades and investments with in-depth reports and
            visualisations.
          </p>

          <a href="#" className="text-decoration-none">
            Learn more →
          </a>
        </div>

      </div>


      {/* ================= COIN ================= */}
      <div className="row align-items-center mb-5 pb-5 gx-5">

        <div className="col-md-6 text-center">
          <img
            src="https://zerodha.com/static/images/products-coin.png"
            alt="Coin"
            className="img-fluid"
          />
        </div>

        <div className="col-md-6">
          <h2>Coin</h2>

          <p className="text-muted">
            Buy direct mutual funds online, commission-free, delivered
            directly to your Demat account. Enjoy the investment experience
            on your Android and iOS devices.
          </p>

          <a href="#" className="text-decoration-none">
            Learn more →
          </a>

          <div className="mt-4">
            <img
              src="https://zerodha.com/static/images/google-play-badge.svg"
              alt="Google Play"
              style={{ width: "140px" }}
              className="me-2"
            />

            <img
              src="https://zerodha.com/static/images/appstore-badge.svg"
              alt="App Store"
              style={{ width: "140px" }}
            />
          </div>
        </div>

      </div>


      {/* ================= KITE CONNECT ================= */}
      <div className="row align-items-center mb-5 pb-5 gx-5">

        <div className="col-md-6 order-md-2 text-center">
          <img
            src="https://zerodha.com/static/images/kite-trade/landing.svg"
            alt="Kite Connect API"
            className="img-fluid"
          />
        </div>

        <div className="col-md-6 order-md-1">
          <h2>Kite Connect API</h2>

          <p className="text-muted">
            Build powerful trading platforms and experiences with our super
            simple HTTP/JSON APIs. If you are a startup, build your
            investment app and showcase it to our clientbase.
          </p>

          <a href="#" className="text-decoration-none">
            Learn more →
          </a>
        </div>

      </div>


      {/* ================= VARSITY ================= */}
      <div className="row align-items-center mb-5 pb-5 gx-5">

        <div className="col-md-6 text-center">
          <img
            src="https://zerodha.com/static/images/varsity-products.svg"
            alt="Varsity"
            className="img-fluid"
          />
        </div>

        <div className="col-md-6">
          <h2>Varsity Mobile</h2>

          <p className="text-muted">
            An easy to grasp collection of stock market lessons with
            in-depth coverage and illustrations. Content is broken down
            into bite-size cards to help you learn on the go.
          </p>

          <div className="mt-4">
            <img
              src="https://zerodha.com/static/images/google-play-badge.svg"
              alt="Google Play"
              style={{ width: "140px" }}
              className="me-2"
            />

            <img
              src="https://zerodha.com/static/images/appstore-badge.svg"
              alt="App Store"
              style={{ width: "140px" }}
            />
          </div>
        </div>

      </div>


      {/* ================= UNIVERSE ================= */}
      <div className="text-center mt-5 pt-5">

        <h2 className="mb-3">
          The FINORA Universe
        </h2>

        <p className="text-muted mb-5">
          Extend your trading and investment experience even further
          with our partner platforms
        </p>

        <div className="row g-5">

          {/* Zerodha Fund House */}
          <div className="col-md-4">
            <img
              src="https://zerodha.com/static/images/partners/zerodhafundhouse.png"
              alt="Zerodha Fund House"
              style={{ width: "150px", height: "70px", objectFit: "contain" }}
            />

            <p className="mt-3 text-muted">
              Our asset management venture creating simple and transparent
              index funds.
            </p>

            <a href="#" className="text-decoration-none">
              Learn more →
            </a>
          </div>


          {/* Streak */}
          <div className="col-md-4">
            <img
              src="https://zerodha.com/static/images/products/streak-logo.png"
              alt="Streak"
              style={{ width: "150px", height: "70px", objectFit: "contain" }}
            />

            <p className="mt-3 text-muted">
              Systematic trading platform that allows you to create and
              backtest strategies without coding.
            </p>

            <a href="#" className="text-decoration-none">
              Learn more →
            </a>
          </div>


          {/* Sensibull */}
          <div className="col-md-4">
            <img
              src="https://zerodha.com/static/images/products/sensibull-logo.svg"
              alt="Sensibull"
              style={{ width: "150px", height: "70px", objectFit: "contain" }}
            />

            <p className="mt-3 text-muted">
              Options trading platform to create strategies, analyze
              positions and examine market data.
            </p>

            <a href="#" className="text-decoration-none">
              Learn more →
            </a>
          </div>


          {/* Smallcase */}
          <div className="col-md-4">
            <img
              src="https://zerodha.com/static/images/products/smallcase-logo.png"
              alt="Smallcase"
              style={{ width: "150px", height: "70px", objectFit: "contain" }}
            />

            <p className="mt-3 text-muted">
              Thematic investing platform that helps you invest in
              diversified baskets of stocks and ETFs.
            </p>

            <a href="#" className="text-decoration-none">
              Learn more →
            </a>
          </div>


          {/* Tijori */}
          <div className="col-md-4">
            <img
              src="https://zerodha.com/static/images/partners/tijori.svg"
              alt="Tijori"
              style={{ width: "150px", height: "70px", objectFit: "contain" }}
            />

            <p className="mt-3 text-muted">
              Investment research platform offering detailed insights
              on stocks, sectors and supply chains.
            </p>

            <a href="#" className="text-decoration-none">
              Learn more →
            </a>
          </div>


          {/* Ditto */}
          <div className="col-md-4">
            <img
              src="https://zerodha.com/static/images/products/ditto-logo.png"
              alt="Ditto"
              style={{ width: "150px", height: "70px", objectFit: "contain" }}
            />

            <p className="mt-3 text-muted">
              Personalized advice on life and health insurance with
              no spam and no mis-selling.
            </p>

            <a href="#" className="text-decoration-none">
              Learn more →
            </a>
          </div>

        </div>

      </div>


      {/* ================= SIGN UP ================= */}
      <div className="text-center mt-5 pt-5">

        <h2>Start your investing journey</h2>

        <p className="text-muted">
          Open your account and start exploring the platform.
        </p>

        <button className="btn btn-primary px-4 py-2 mt-2">
          Sign up for free
        </button>

      </div>

    </div>
  );
}

export default Universe;

