import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Trading.css";

const API = "http://localhost:3002";

const initialWatchlist = [
  { symbol: "RELIANCE", name: "Reliance Industries", price: 1250, change: 1.25 },
  { symbol: "TCS", name: "Tata Consultancy", price: 3450, change: 1.20 },
  { symbol: "INFY", name: "Infosys Limited", price: 1500, change: 0.85 },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1650, change: 0.65 },
  { symbol: "WIPRO", name: "Wipro Limited", price: 430, change: -1.10 },
  { symbol: "ICICIBANK", name: "ICICI Bank", price: 1280, change: 0.75 },
  { symbol: "ITC", name: "ITC Limited", price: 465, change: -0.35 }
];

function Trading() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [watchlist] = useState(initialWatchlist);
  const [selectedStock, setSelectedStock] = useState(initialWatchlist[0]);

  const [holdings, setHoldings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [positions, setPositions] = useState([]);
  const [funds, setFunds] = useState(null);

  const [activeTab, setActiveTab] = useState("Overview");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [positionsLoading, setPositionsLoading] = useState(true);
  const [fundsLoading, setFundsLoading] = useState(true);

  const [amount, setAmount] = useState("");
  const [fundActionLoading, setFundActionLoading] = useState(false);
  const [fundMessage, setFundMessage] = useState("");
  const [fundError, setFundError] = useState("");

  // JWT Token
  const getAuthHeaders = () => {
    const token = localStorage.getItem("finoraToken");

    return {
      Authorization: `Bearer ${token}`
    };
  };

  // Authentication
  useEffect(() => {
    const token = localStorage.getItem("finoraToken");
    const savedUser = localStorage.getItem("finoraUser");

    if (!token || !savedUser) {
      navigate("/login");
      return;
    }

    try {
      setUser(JSON.parse(savedUser));
    } catch {
      localStorage.removeItem("finoraUser");
      localStorage.removeItem("finoraToken");
      navigate("/login");
      return;
    }

    fetchHoldings();
    fetchOrders();
    fetchPositions();
    fetchFunds();

  }, [navigate]);

  // Fetch Holdings
  const fetchHoldings = async () => {
    try {
      const response = await fetch(`${API}/test-holdings`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error("Unable to fetch holdings");
      }

      const data = await response.json();
      setHoldings(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error("Holdings Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API}/test-orders`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error("Unable to fetch orders");
      }

      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error("Orders Error:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  // Fetch Positions
  const fetchPositions = async () => {
    try {
      const response = await fetch(`${API}/test-positions`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error("Unable to fetch positions");
      }

      const data = await response.json();
      setPositions(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error("Positions Error:", error);
    } finally {
      setPositionsLoading(false);
    }
  };

  // Fetch Funds
  const fetchFunds = async () => {
    try {
      const response = await fetch(`${API}/test-funds`, {
        headers: getAuthHeaders()
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch funds");
      }

      setFunds(data);
      setFundError("");

    } catch (error) {
      console.error("Funds Error:", error);
      setFundError(error.message);
    } finally {
      setFundsLoading(false);
    }
  };

  // Add or Withdraw Funds
  const handleFundTransaction = async (type) => {
    setFundMessage("");
    setFundError("");

    const enteredAmount = Number(amount);

    if (!amount || !Number.isFinite(enteredAmount) || enteredAmount <= 0) {
      setFundError("Please enter a valid amount.");
      return;
    }

    if (
      type === "withdraw" &&
      enteredAmount > Number(funds?.availableBalance || 0)
    ) {
      setFundError("Insufficient balance.");
      return;
    }

    try {
      setFundActionLoading(true);

      const endpoint =
        type === "add" ? "/add-funds" : "/withdraw-funds";

      const response = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders()
        },
        body: JSON.stringify({
          amount: enteredAmount
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Transaction failed.");
      }

      setFunds(data.funds);
      setAmount("");

      setFundMessage(data.message || (
        type === "add"
          ? "Funds added successfully!"
          : "Withdrawal successful!"
      ));

    } catch (error) {
      console.error("Funds Transaction Error:", error);
      setFundError(error.message);

    } finally {
      setFundActionLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("finoraToken");
    localStorage.removeItem("finoraUser");
    navigate("/login");
  };

  // Portfolio Calculations
  const totalInvestment = holdings.reduce(
    (total, stock) =>
      total +
      Number(stock.qty || stock.quantity || 0) *
      Number(stock.avg || stock.avgPrice || stock.price || 0),
    0
  );

  const currentValue = holdings.reduce(
    (total, stock) =>
      total +
      Number(stock.qty || stock.quantity || 0) *
      Number(stock.price || 0),
    0
  );

  const profitLoss = currentValue - totalInvestment;

  const filteredStocks = watchlist.filter((stock) =>
    stock.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // Demo Buy/Sell
  const handleTrade = (type) => {
    alert(
      `${type} order selected for ${selectedStock.symbol}.\nThis is currently a demo interface. No real order has been placed.`
    );
  };

  const formatMoney = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  return (
    <div className="finora-trading">

      {/* Navbar */}
      <header className="trading-navbar">

        <div className="trading-logo">
          <span>F</span>
          FINORA
          <small>TRADING</small>
        </div>

        <nav className="trading-nav-links">
          {["Overview", "Holdings", "Orders", "Positions", "Funds"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => {
                setActiveTab(tab);
                setFundMessage("");
                setFundError("");
              }}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="trading-user">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <span>{user?.name || "User"}</span>

          <button onClick={logout}>Logout</button>
        </div>

      </header>

      {/* Market Status */}
      <div className="market-status">

        <div>
          <span className="market-dot"></span>
          Market Overview
        </div>

        <span>NIFTY 50 <b>24,320.45</b> <em>+0.85%</em></span>

        <span>SENSEX <b>79,845.20</b> <em>+0.72%</em></span>

        <small>Demo Market Data</small>

      </div>

      <main className="trading-main">

        {/* Welcome */}
        <div className="trading-heading">

          <div>
            <p>WELCOME TO FINORA</p>

            <h1>
              Hello, {user?.name?.split(" ")[0] || "Trader"} 👋
            </h1>

            <span>Here's your investment overview.</span>
          </div>

          <div className="market-open">
            <span></span> Trading Platform
          </div>

        </div>

        {/* Portfolio Cards */}
        <section className="portfolio-cards">

          <div className="portfolio-card">
            <p>Total Investment</p>
            <h2>₹{formatMoney(totalInvestment)}</h2>
            <span>Amount invested</span>
          </div>

          <div className="portfolio-card">
            <p>Current Value</p>
            <h2>₹{formatMoney(currentValue)}</h2>
            <span>Portfolio valuation</span>
          </div>

          <div className="portfolio-card">
            <p>Total P&L</p>
            <h2 className={profitLoss >= 0 ? "positive" : "negative"}>
              {profitLoss >= 0 ? "+" : "-"}₹{formatMoney(Math.abs(profitLoss))}
            </h2>
            <span>Based on available holdings data</span>
          </div>

          <div className="portfolio-card">
            <p>Stocks in Portfolio</p>
            <h2>{holdings.length}</h2>
            <span>Number of holdings</span>
          </div>

        </section>

        {/* Overview */}
        {activeTab === "Overview" && (

          <section className="trading-grid">

            {/* Market Watch */}
            <div className="trading-panel watchlist-panel">

              <div className="panel-heading">
                <div>
                  <h3>Market Watch</h3>
                  <p>Explore popular stocks</p>
                </div>

                <span>{watchlist.length} Stocks</span>
              </div>

              <input
                className="stock-search"
                type="text"
                placeholder="Search stocks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="watchlist-items">

                {filteredStocks.map((stock) => (

                  <div
                    key={stock.symbol}
                    className={`watchlist-item ${
                      selectedStock.symbol === stock.symbol ? "selected" : ""
                    }`}
                    onClick={() => setSelectedStock(stock)}
                  >

                    <div>
                      <strong>{stock.symbol}</strong>
                      <small>{stock.name}</small>
                    </div>

                    <div className="stock-price">
                      <strong>₹{stock.price.toLocaleString("en-IN")}</strong>

                      <small className={stock.change >= 0 ? "positive" : "negative"}>
                        {stock.change > 0 ? "+" : ""}
                        {stock.change}%
                      </small>
                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* Chart */}
            <div className="trading-panel chart-panel">

              <div className="panel-heading">

                <div>
                  <h3>{selectedStock.symbol}</h3>
                  <p>{selectedStock.name}</p>
                </div>

                <div className="selected-price">
                  ₹{selectedStock.price.toLocaleString("en-IN")}

                  <small className={selectedStock.change >= 0 ? "positive" : "negative"}>
                    {selectedStock.change > 0 ? "+" : ""}
                    {selectedStock.change}%
                  </small>
                </div>

              </div>

              <div className="chart-placeholder">

                <div className="chart-label">
                  STOCK PRICE CHART
                </div>

                <div className="chart-line">

                  {Array.from({ length: 30 }, (_, i) => (

                    <div
                      key={i}
                      className={`chart-candle ${
                        i % 4 === 0 ? "down" : "up"
                      }`}
                      style={{
                        height: `${25 + ((i * 17) % 65)}px`
                      }}
                    ></div>

                  ))}

                </div>

                <p>Illustrative chart · Demo data only</p>

              </div>

              <div className="trade-actions">
                <button onClick={() => handleTrade("BUY")}>BUY</button>
                <button onClick={() => handleTrade("SELL")}>SELL</button>
              </div>

            </div>

          </section>

        )}

        {/* Holdings */}
        {activeTab === "Holdings" && (

          <section className="trading-panel data-panel">

            <h3>My Holdings</h3>

            {loading ? (
              <p>Loading holdings...</p>
            ) : holdings.length === 0 ? (
              <p>No holdings available.</p>
            ) : (

              <div className="table-scroll">
                <table>

                  <thead>
                    <tr>
                      <th>Stock</th>
                      <th>Quantity</th>
                      <th>Average Price</th>
                      <th>Current Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    {holdings.map((stock) => (
                      <tr key={stock._id}>
                        <td>{stock.name}</td>
                        <td>{stock.qty ?? stock.quantity ?? "-"}</td>
                        <td>₹{stock.avg ?? stock.avgPrice ?? "-"}</td>
                        <td>₹{stock.price ?? "-"}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

            )}

          </section>

        )}

        {/* Orders */}
        {activeTab === "Orders" && (

          <section className="trading-panel data-panel">

            <h3>My Orders</h3>

            {ordersLoading ? (
              <p>Loading orders...</p>
            ) : orders.length === 0 ? (
              <p>No orders available.</p>
            ) : (

              <div className="table-scroll">
                <table>

                  <thead>
                    <tr>
                      <th>Stock</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Mode</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.name || order.stock || "-"}</td>
                        <td>{order.qty ?? order.quantity ?? "-"}</td>
                        <td>₹{order.price ?? "-"}</td>
                        <td>{order.mode || order.type || "-"}</td>
                        <td>{order.status || "Completed"}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

            )}

          </section>

        )}

        {/* Positions */}
        {activeTab === "Positions" && (

          <section className="trading-panel data-panel">

            <h3>My Positions</h3>

            {positionsLoading ? (
              <p>Loading positions...</p>
            ) : positions.length === 0 ? (
              <p>No positions available.</p>
            ) : (

              <div className="table-scroll">
                <table>

                  <thead>
                    <tr>
                      <th>Stock</th>
                      <th>Quantity</th>
                      <th>Average Price</th>
                      <th>Current Price</th>
                      <th>P&L</th>
                    </tr>
                  </thead>

                  <tbody>
                    {positions.map((position) => (
                      <tr key={position._id}>
                        <td>{position.name || position.stock || "-"}</td>
                        <td>{position.qty ?? position.quantity ?? "-"}</td>
                        <td>₹{position.avg ?? position.avgPrice ?? "-"}</td>
                        <td>₹{position.price ?? "-"}</td>

                        <td className={
                          Number(position.net ?? position.pnl ?? 0) >= 0
                            ? "positive"
                            : "negative"
                        }>
                          ₹{position.net ?? position.pnl ?? "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

            )}

          </section>

        )}

        {/* Funds */}
        {activeTab === "Funds" && (

          <section className="funds-section">

            <div className="funds-heading">
              <div>
                <h2>My Funds</h2>
                <p>Manage your FINORA account balance.</p>
              </div>

              <button
                className="fund-refresh"
                onClick={fetchFunds}
                disabled={fundsLoading}
              >
                ↻ Refresh
              </button>
            </div>

            {fundsLoading ? (
              <div className="trading-panel">
                Loading funds...
              </div>
            ) : funds ? (

              <>
                <div className="funds-cards">

                  <div className="funds-card balance-card">
                    <p>Available Balance</p>

                    <h2>
                      ₹{formatMoney(funds.availableBalance)}
                    </h2>

                    <span>Available for trading</span>
                  </div>

                  <div className="funds-card">
                    <p>Total Deposited</p>

                    <h2>
                      ₹{formatMoney(funds.totalDeposited)}
                    </h2>

                    <span>Total amount added</span>
                  </div>

                  <div className="funds-card">
                    <p>Total Withdrawn</p>

                    <h2>
                      ₹{formatMoney(funds.totalWithdrawn)}
                    </h2>

                    <span>Total amount withdrawn</span>
                  </div>

                </div>

                <div className="trading-panel funds-action-panel">

                  <h3>Manage Your Funds</h3>

                  <p>Enter the amount you want to add or withdraw.</p>

                  <div className="fund-input-group">

                    <label>Amount (₹)</label>

                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        setFundMessage("");
                        setFundError("");
                      }}
                    />

                  </div>

                  {fundError && (
                    <div className="fund-error">
                      {fundError}
                    </div>
                  )}

                  {fundMessage && (
                    <div className="fund-success">
                      {fundMessage}
                    </div>
                  )}

                  <div className="fund-buttons">

                    <button
                      className="add-fund-btn"
                      onClick={() => handleFundTransaction("add")}
                      disabled={fundActionLoading}
                    >
                      {fundActionLoading ? "Processing..." : "+ Add Funds"}
                    </button>

                    <button
                      className="withdraw-fund-btn"
                      onClick={() => handleFundTransaction("withdraw")}
                      disabled={fundActionLoading}
                    >
                      {fundActionLoading ? "Processing..." : "− Withdraw Funds"}
                    </button>

                  </div>

                </div>
              </>

            ) : (

              <div className="trading-panel">
                <p>Unable to load funds. Please try again.</p>
                <p>{fundError}</p>

                <button onClick={fetchFunds}>
                  Retry
                </button>
              </div>

            )}

          </section>

        )}

      </main>

      <footer className="trading-footer">
        © 2026 FINORA Technologies. All rights reserved.
        <span>Invest Smart. Trade Better.</span>
      </footer>

    </div>
  );
}

export default Trading;