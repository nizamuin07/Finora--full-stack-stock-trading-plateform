import React, { useState } from "react";

function Support() {

  const [open, setOpen] = useState(null);

  const categories = [
    {
      icon: "⊕",
      title: "Account Opening",
      questions: [
        "How do I open an account?",
        "What documents are required?",
        "How long does account opening take?"
      ]
    },
    {
      icon: "◎",
      title: "Your Zerodha Account",
      questions: [
        "How do I manage my account?",
        "How do I update my profile?",
        "How do I change my password?"
      ]
    },
    {
      icon: "◉",
      title: "Kite",
      questions: [
        "How do I use Kite?",
        "How do I place an order?",
        "How do I view my holdings?"
      ]
    },
    {
      icon: "₹",
      title: "Funds",
      questions: [
        "How do I add funds?",
        "How do I withdraw funds?",
        "How long does withdrawal take?"
      ]
    },
    {
      icon: "◎",
      title: "Console",
      questions: [
        "How do I view reports?",
        "Where can I check my transactions?",
        "How do I download statements?"
      ]
    },
    {
      icon: "▣",
      title: "Coin",
      questions: [
        "How do I invest in mutual funds?",
        "How do I track my investments?",
        "How do I redeem my mutual funds?"
      ]
    }
  ];

  const toggleCategory = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div className="support-page">

      {/* ================= HEADER ================= */}

      <div className="support-header">

        <div className="container">

          <div className="d-flex justify-content-between align-items-center">

            <h1 className="support-title">
              Support Portal
            </h1>

            <button className="btn btn-primary tickets-btn">
              My tickets
            </button>

          </div>


          {/* Search */}

          <div className="support-search mt-4">

            <span className="search-icon">
              🔍
            </span>

            <input
              type="text"
              placeholder="Eg: How do I open my account, How do I activate F&O..."
            />

          </div>

        </div>

      </div>


      {/* ================= MAIN CONTENT ================= */}

      <div className="container support-content">

        <div className="row gx-5">


          {/* ================= LEFT ================= */}

          <div className="col-lg-8">

            {categories.map((category, index) => (

              <div
                className="support-category mb-4"
                key={index}
              >

                {/* Category Header */}

                <div
                  className="category-header"
                  onClick={() => toggleCategory(index)}
                >

                  <div className="category-left">

                    <div className="category-icon">
                      {category.icon}
                    </div>

                    <h4>
                      {category.title}
                    </h4>

                  </div>

                  <span className="arrow">
                    {open === index ? "⌃" : "⌄"}
                  </span>

                </div>


                {/* Questions */}

                {open === index && (

                  <div className="category-body">

                    {category.questions.map((question, qIndex) => (

                      <a
                        href="#"
                        key={qIndex}
                        className="question-link"
                      >
                        {question}
                      </a>

                    ))}

                  </div>

                )}

              </div>

            ))}

          </div>


          {/* ================= RIGHT ================= */}

          <div className="col-lg-4">


            {/* Announcements */}

            <div className="announcement-box">

              <ul>

                <li>
                  <a href="#">
                    Important updates and announcements
                  </a>
                </li>

                <li>
                  <a href="#">
                    Latest trading and market updates
                  </a>
                </li>

              </ul>

            </div>


            {/* Quick Links */}

            <div className="quick-links">

              <div className="quick-title">
                Quick links
              </div>

              <a href="#">
                1. Track account opening
              </a>

              <a href="#">
                2. Track segment activation
              </a>

              <a href="#">
                3. Intraday margins
              </a>

              <a href="#">
                4. Kite user manual
              </a>

              <a href="#">
                5. Console help
              </a>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Support;