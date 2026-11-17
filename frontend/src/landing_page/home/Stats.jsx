
function Stats() {
  return (
    <div className="container py-5">
      <div className="row">

        {/* Left Section */}
        <div className="col-6 text-start">

          <h4 className="fs-4">Trust with confidence</h4>

          <h5 className="mt-4 fs-5">Customer-first always</h5>
          <p className='text-muted'>
            FINORA is designed around clear portfolio insights, simple account
            management, and a distraction-free investing experience.
          </p>

          <h5 className="mt-4 fs-5">No spam or gimmicks</h5>
          <p className='text-muted'>
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like.{' '}
            <a href="/" aria-label="Our philosophies">
              Our philosophies
            </a>
          </p>

          <h5 className="mt-4 fs-5">The FINORA experience</h5>
          <p className='text-muted'>
            Track markets, review positions, manage funds, and follow your
            investments from one connected dashboard.
          </p>

          <h5 className="mt-4 fs-5">Do better with money</h5>
          <p className='text-muted'>
            With initiatives like <a href="/nudge">Nudge</a> and{' '}
            <a href="/kill-switch">Kill Switch</a>, we don't just facilitate
            transactions, but actively help you do better with your money.
          </p>

        </div>

        {/* Right Section */}
        <div className="col-6">

          <img
            src="/ecosystem.png"
            alt="Ecosystem"
            className="img-fluid"
          />

          <div className="d-flex justify-content-center gap-4 mt-4">

            <a href="/" className="text-decoration-none">
              Explore our products <span aria-hidden="true">→</span>
            </a>

            <a href="/" className="text-decoration-none">
              Try Kite demo <span aria-hidden="true">→</span>
            </a>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Stats;