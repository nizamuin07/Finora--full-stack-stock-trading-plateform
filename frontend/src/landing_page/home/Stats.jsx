import React from 'react';

function Stats() {
  return (
    <div className="container py-5">
      <div className="row">

        {/* Left Section */}
        <div className="col-6 text-start">

          <h4 className="fs-4">Trust with confidence</h4>

          <h5 className="mt-4 fs-5">Customer-first always</h5>
          <p className='text-muted'>
            That's why 1.8+ crore customers trust Zerodha with ~ ₹9 lakh crores
            of equity investments, making us India’s largest broker; contributing
            to 15% of daily retail exchange volumes in India.
          </p>

          <h5 className="mt-4 fs-5">No spam or gimmicks</h5>
          <p className='text-muted'>
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like.{' '}
            <a href="/" aria-label="Our philosophies">
              Our philosophies
            </a>
          </p>

          <h5 className="mt-4 fs-5">The Zerodha universe</h5>
          <p className='text-muted'>
            Not just an app, but a whole ecosystem. Our investments in 30+
            fintech startups offer you tailored services specific to your needs.
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