

function Hero() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <img
            src="/dashboard.png"
            alt="Finnora Dashboard"
            className="img-fluid hero-img"
          />
          <h2 className="mt-5">Invest in everything </h2>
          <p>Online platform to invest in stocks, IPOs, derivatives, mutual funds, ETFs, bonds, and more.</p>
          <button type="button" class="btn btn-primary">Signup for free</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;