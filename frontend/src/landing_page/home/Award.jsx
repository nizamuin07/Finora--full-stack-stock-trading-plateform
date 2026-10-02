
function Award() {
  return (
    <div className="container py-5 mt-5">
      <div className="row">
        <div className="col-6">
          <img
            src="/largestBroker.svg"
            alt="award page"
            className="img-fluid"
          />
        </div>
         <div className="col-6">
            <h2>Largest stock broker in india</h2>
            <p>2+ million Zerodha clients contribute to over 15% of all retail order volumees in india daily by trading and investing in:</p>
            <div className="row">
                <div className="col-6">
                    <ul>
                <li>
                    <p>futures and Options</p>
                    </li>
                <li>
                    <p>Commodity derivatives</p>
                    </li>
                <li>
                    <p>Currency derivatives</p>
                    </li>
                
            </ul>
                </div>
                <div className="col-6">
                    <li>
                        <p>Stocks & IPOs</p>
                    </li>
                    <li>
                        <p>Direct mutual funds</p>
                    </li>
                    <li>
                        <p>Bonds and Govt. Securities</p>
                    </li>
                </div>
                
            </div>
           <img src="/pressLogos.png" alt="Logos" className="img-fluid pt-2" />
         </div>
      </div>
    </div>
  );
}

export default Award;