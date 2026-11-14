import React from "react";
import { useNavigate } from "react-router-dom";

function OpenAccount() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row text-center justify-content-center">
        <div className="col-12">
          <h2 className="mt-5">Open a FINORA account</h2>

          <p className="mt-4">
            Modern trading platform, portfolio tracking and smart investment tools.
          </p>

          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={() => navigate("/signup")}
          >
            Signup for free
          </button>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;