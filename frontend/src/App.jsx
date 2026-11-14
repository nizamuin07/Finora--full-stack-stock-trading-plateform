import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Landing Page Components
import HomePage from "./landing_page/home/HomePage";
import Navbar from "./Navbar";
import Footer from "./landing_page/Footer";
import NotFound from "./landing_page/NotFoundPage";
import AboutPage from "./landing_page/about/AboutPage";
import Universe from "./landing_page/product/Universe";
import Hero from "./landing_page/pricing/Hero";
import Support from "./landing_page/support/Support";
import Signup from "./landing_page/signup/Signup";
import OpenAccount from "./landing_page/OpenAccount";
import Login from "./landing_page/login/Login";

// Trading Interface
import Trading from "./trading/Trading";

function AppLayout() {
  const location = useLocation();

  // Hide landing Navbar and Footer on Trading Page
  const isTradingPage = location.pathname === "/trading";

  return (
    <>
      {!isTradingPage && <Navbar />}

      <Routes>
        {/* Landing Website */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<Universe />} />
        <Route path="/pricing" element={<Hero />} />
        <Route path="/support" element={<Support />} />
        <Route path="/open-account" element={<OpenAccount />} />

        {/* Authentication */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Trading Interface */}
        <Route path="/trading" element={<Trading />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isTradingPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;