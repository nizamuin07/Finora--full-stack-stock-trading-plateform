
import "./index.css";
import { Link } from "react-router-dom";

function Navbar() {
  const isAuthenticated = Boolean(localStorage.getItem("finoraToken"));

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <span className="finora-nav-brand">
            <span>F</span>
            FINORA
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            {isAuthenticated ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/trading">Trading</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/product">Products</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/pricing">Pricing</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/support">Support</Link></li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>
              </>
            )}

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;

