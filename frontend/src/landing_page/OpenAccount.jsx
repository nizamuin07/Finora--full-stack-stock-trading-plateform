import { useNavigate } from "react-router-dom";

function OpenAccount() {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem("finoraToken"));

  return (
    <div className="container mt-5 home-reveal">
      <div className="row text-center justify-content-center">
        <div className="col-12">
          <h2 className="mt-5">Open a FINORA account</h2>

          <p className="mt-4">
            Modern trading platform, portfolio tracking and smart investment tools.
          </p>

          <button
            type="button"
            className="btn btn-primary mt-4 finora-primary-button"
            onClick={() => navigate(isAuthenticated ? "/trading" : "/signup")}
          >
            {isAuthenticated ? "Open trading dashboard" : "Signup for free"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;