import { Link } from "react-router-dom";

function Team() {
  return (
    <section className="container about-story">
      <div className="about-section-heading">
        <span className="about-eyebrow">OUR APPROACH</span>
        <h2>Making markets work for everyone.</h2>
      </div>
      <div className="row about-content g-4">
        <div className="col-md-6">
          <div className="about-copy-card">
            <p>
              We kick-started operations on the 15th of August, 2010
              with the goal of breaking all barriers that traders and
              investors face in India in terms of cost, support, and
              technology. FINORA is built around simple access, clear information, and responsible investing.
            </p>
            <p>Today, our disruptive pricing models and in-house technology have made us the biggest stock broker in India.</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="about-copy-card about-copy-card-accent">
            <p>
              Over 1.8+ crore clients place billions of orders every year through our powerful ecosystem of investment platforms, contributing over 15% of all Indian retail trading volumes.
            </p>
            <p>
              In addition, we run a number of popular open online
              educational and community initiatives to empower retail
              traders and investors.
            </p>
            <p>
              <Link to="/rainmatter">Rainmatter</Link>, our fintech fund and incubator,
              has invested in several fintech startups with the goal of
              growing the Indian capital markets.
            </p>
            <p>
              And yet, we are always up to something new every day.
              Catch up on the latest updates on our{" "}
              <Link to="/blog">blog</Link> or see what the media is{" "}
              <Link to="/media">saying about us</Link> or learn more about our{" "}
              <Link to="/philosophy">business and product philosophies</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;