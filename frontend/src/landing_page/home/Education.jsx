function Education() {
    return ( 
     <div className="container mt-5">
         <div className="row">
            {/* left side */}
            <div className="col-6">
                <img src="education.svg" alt="education" className='img-fluid' />
            </div>

            {/* right side */}
            <div className="col-6">
                <h3 className='mt-5 text-muted'>Free and open market education</h3>
                <p className='mt-4'>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                 <a href="/" className="text-decoration-none">
                 varsity<span aria-hidden="true">→</span>
          </a>
          <p className='mt-4 mb-4'>
            TradingQ&A, the most active trading and investment community in India for all your market related queries.
          </p>
               <a href="/" className="text-decoration-none">
                 TradingQ&A <span aria-hidden="true">→</span>
          </a>
            </div>
         </div>
     </div>
    );
}

export default Education;