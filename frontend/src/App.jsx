import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./landing_page/home/HomePage";
import Navbar from "./Navbar";
import Footer from "./landing_page/Footer";
import NotFound from "./landing_page/NotFoundPage";
import AboutPage from "./landing_page/about/AboutPage"
import Universe from "./landing_page/product/Universe";
import Hero from "./landing_page/pricing/Hero"
import Support from "./landing_page/support/Support";
function App() {
  return (
    
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/product" element={<Universe/>}/>
        <Route path="/pricing" element={<Hero/>}/>
        <Route path="/support" element={<Support/>}/>
        <Route path="*" element={<NotFound/>} />
       
      </Routes>
       <Footer/>
    </BrowserRouter>
   

  );
}

export default App;
