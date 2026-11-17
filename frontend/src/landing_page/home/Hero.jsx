
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="container py-5 finora-hero">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <img
            src="/dashboard.png"
            alt="Finnora Dashboard"
            className="img-fluid hero-img"
          />
          <h1 className="mt-5">Invest in everything</h1>
          <p className="finora-hero-copy">
            A simple, modern platform to track stocks, manage orders, and monitor your portfolio.
          </p>
          <button
            type="button"
            className="btn btn-primary finora-primary-button"
            onClick={() => navigate("/signup")}
          >
            Create free account
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;