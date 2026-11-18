import { useState } from "react";
import "./Support.css";

function Support() {
  const [open, setOpen] = useState(null);
  const [search, setSearch] = useState("");

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
      title: "Your FINORA Account",
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

  const filteredCategories = categories
    .map((category, index) => {
      const titleMatches = category.title.toLowerCase().includes(search.trim().toLowerCase());
      const questions = titleMatches
        ? category.questions
        : category.questions.filter((question) =>
            question.toLowerCase().includes(search.trim().toLowerCase())
          );
      return { ...category, index, questions };
    })
    .filter((category) => category.questions.length > 0);

  return (
    <div className="support-page">
      <header className="support-header">
        <div className="container support-header-inner">
          <div className="support-heading-row">
            <div>
              <span className="support-eyebrow">WE'RE HERE TO HELP</span>
              <h1 className="support-title">How can we help?</h1>
              <p>Find quick answers and get back to investing with confidence.</p>
            </div>
            <button type="button" className="tickets-btn">
              <span aria-hidden="true">↗</span> My tickets
            </button>
          </div>

          <label className="support-search">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <span className="visually-hidden">Search help topics</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search a question, topic or keyword..."
            />
            <span className="search-hint">Search</span>
          </label>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <div className="container support-content">
        <div className="support-section-heading">
          <div>
            <span className="support-eyebrow">HELP CENTRE</span>
            <h2>Explore help topics</h2>
          </div>
          <span className="support-topic-count">{filteredCategories.length} topics</span>
        </div>
        <div className="row gx-lg-5 gy-4">
          {/* ================= LEFT ================= */}
          <div className="col-lg-8">
            {filteredCategories.map((category) => (
              <div
                className="support-category"
                key={category.index}
              >
                <button
                  type="button"
                  className="category-header"
                  onClick={() => toggleCategory(category.index)}
                  aria-expanded={open === category.index || Boolean(search.trim())}
                  aria-controls={`support-category-${category.index}`}
                >
                  <div className="category-left">
                    <span className="category-icon" aria-hidden="true">
                      {category.icon}
                    </span>
                    <span className="category-title-wrap">
                      <strong>{category.title}</strong>
                      <small>{category.questions.length} helpful answers</small>
                    </span>
                  </div>
                  <span className="arrow" aria-hidden="true">
                    {open === category.index || search.trim() ? "−" : "+"}
                  </span>
                </button>
                {/* Questions */}
                <div
                  className="category-body"
                  id={`support-category-${category.index}`}
                  hidden={open !== category.index && !search.trim()}
                >
                  {category.questions.map((question) => (
                    <a
                      href="#"
                      key={question}
                      className="question-link"
                    >
                      <span>{question}</span><span aria-hidden="true">→</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
            {filteredCategories.length === 0 && (
              <div className="support-empty-state">
                <span aria-hidden="true">⌕</span>
                <h3>No matching topics yet</h3>
                <p>Try a different search, or browse all help topics.</p>
                <button type="button" onClick={() => setSearch("")}>Clear search</button>
              </div>
            )}
          </div>
          {/* ================= RIGHT ================= */}
          <div className="col-lg-4">
            {/* Announcements */}
            <div className="announcement-box">
              <span className="announcement-mark" aria-hidden="true">✦</span>
              <span className="support-card-kicker">STAY IN THE LOOP</span>
              <h3>Latest updates</h3>
              <a href="#">Important updates and announcements <span aria-hidden="true">→</span></a>
              <a href="#">Trading and market updates <span aria-hidden="true">→</span></a>
            </div>
            {/* Quick Links */}
            <div className="quick-links">
              <div className="quick-title">
                <span className="quick-title-icon" aria-hidden="true">✳</span>
                <div><span className="support-card-kicker">POPULAR RESOURCES</span><h3>Quick links</h3></div>
              </div>
              <a href="#"><span>01</span>Track account opening <b aria-hidden="true">→</b></a>
              <a href="#"><span>02</span>Track segment activation <b aria-hidden="true">→</b></a>
              <a href="#"><span>03</span>Intraday margins <b aria-hidden="true">→</b></a>
              <a href="#"><span>04</span>Kite user manual <b aria-hidden="true">→</b></a>
              <a href="#"><span>05</span>Console help <b aria-hidden="true">→</b></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;