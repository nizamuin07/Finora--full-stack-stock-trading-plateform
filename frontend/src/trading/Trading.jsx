import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FundsPanel from "./components/FundsPanel";
import HoldingsPanel from "./components/HoldingsPanel";
import MarketWatch from "./components/MarketWatch";
import OrdersPanel from "./components/OrdersPanel";
import PositionsPanel from "./components/PositionsPanel";
import TradeOrderModal from "./components/TradeOrderModal";
import TradingChart from "./components/TradingChart";
import {
  createDemoCandles,
  demoFunds,
  demoHoldings,
  demoOrders,
  demoPositions,
  initialWatchlist
} from "./data/marketData";
import { apiUrl } from "../services/api";
import { fetchMarketHistory, fetchMarketQuotes } from "./services/marketApi";
import "./Trading.css";

function Trading() {
  const navigate = useNavigate();

  const [user] = useState(() => {
    const savedUser = localStorage.getItem("finoraUser");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem("finoraUser");
      localStorage.removeItem("finoraToken");
      return null;
    }
  });

  const [watchlist, setWatchlist] = useState(initialWatchlist);
  const [selectedStock, setSelectedStock] = useState(initialWatchlist[0]);
  const selectedStockRef = useRef(initialWatchlist[0]);
  const [chartCandles, setChartCandles] = useState(() =>
    createDemoCandles(initialWatchlist[0].price)
  );

  const [holdings, setHoldings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [positions, setPositions] = useState([]);
  const [funds, setFunds] = useState(demoFunds);

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
  const [tradeModal, setTradeModal] = useState(null);
  const [tradeQuantity, setTradeQuantity] = useState("1");
  const [tradeMessage, setTradeMessage] = useState("");
  const [tradeMarkers, setTradeMarkers] = useState([]);
  const [stopLossPrice, setStopLossPrice] = useState("");
  const [takeProfitPrice, setTakeProfitPrice] = useState("");
  const [activeProtections, setActiveProtections] = useState([]);
  const protectionExecutions = useRef(new Set());
  const [chartRange, setChartRange] = useState("1D");
  const [chartType, setChartType] = useState("candles");
  const [indicator, setIndicator] = useState("none");
  const [drawingTool, setDrawingTool] = useState("cursor");
  const [crosshair, setCrosshair] = useState(null);
  const [drawingPoints, setDrawingPoints] = useState([]);
  const [chartZoom, setChartZoom] = useState(1);
  const [orderType, setOrderType] = useState("MARKET");
  const [limitPrice, setLimitPrice] = useState("");
  const [toast, setToast] = useState("");
  const [favoriteSymbols, setFavoriteSymbols] = useState(
    () => new Set(["RELIANCE", "HDFCBANK", "TCS"])
  );
  const [liveMarketConnected, setLiveMarketConnected] = useState(false);
  const [liveMarketError, setLiveMarketError] = useState("");
  const [chartHistoryConnected, setChartHistoryConnected] = useState(false);
  const [niftyIndex, setNiftyIndex] = useState({ price: 24320.45, change: 0.85 });
  const [sensexIndex, setSensexIndex] = useState({ price: 79845.2, change: 0.72 });

  useEffect(() => {
    if (liveMarketConnected) return undefined;

    const marketTimer = window.setInterval(() => {
      setWatchlist((current) =>
        current.map((stock) => {
          const movement = (Math.random() - 0.48) * stock.price * 0.0012;
          const nextPrice = Math.max(1, Number((stock.price + movement).toFixed(2)));
          const movementPercent = ((nextPrice - stock.price) / stock.price) * 100;
          const nextStock = {
            ...stock,
            price: nextPrice,
            change: Number((stock.change + movementPercent).toFixed(2))
          };

          if (selectedStockRef.current.symbol === stock.symbol) {
            selectedStockRef.current = nextStock;
          }
          setSelectedStock((selected) =>
            selected.symbol === stock.symbol ? nextStock : selected
          );

          return nextStock;
        })
      );

      setChartCandles((current) => {
        if (!current.length) return current;
        const next = [...current];
        const latest = next[next.length - 1];
        const close = Math.max(1, latest.close * (1 + (Math.random() - 0.5) * 0.004));
        next[next.length - 1] = {
          open: latest.open,
          close,
          high: Math.max(latest.high, close),
          low: Math.min(latest.low, close)
        };
        return next;
      });
    }, 1800);

    return () => window.clearInterval(marketTimer);
  }, [liveMarketConnected]);

  useEffect(() => {
    let isActive = true;
    const symbols = [
      ...initialWatchlist.map((stock) => stock.ticker),
      "^NSEI",
      "^BSESN"
    ].join(",");

    const fetchQuotes = async () => {
      try {
        const quotes = await fetchMarketQuotes(symbols.split(","));
        if (!isActive || !Array.isArray(quotes) || !quotes.length) return;

        setWatchlist((current) =>
          current.map((stock) => {
            const quote = quotes.find(
              (item) => item.symbol === stock.ticker
            );

            const niftyQuote = quotes.find((item) => item.symbol === "^NSEI");
            const sensexQuote = quotes.find((item) => item.symbol === "^BSESN");

            if (niftyQuote) {
              setNiftyIndex({
                price: Number(niftyQuote.price),
                change: Number(niftyQuote.change)
              });
            }

            if (sensexQuote) {
              setSensexIndex({
                price: Number(sensexQuote.price),
                change: Number(sensexQuote.change)
              });
            }

            return quote
              ? {
                  ...stock,
                  price: Number(quote.price),
                  change: Number(quote.change),
                  name: quote.name || stock.name,
                  marketTime: quote.marketTime
                }
              : stock;
          })
        );

        const selectedQuote = quotes.find(
          (item) => item.symbol === selectedStockRef.current.ticker
        );
        if (selectedQuote) {
          const current = selectedStockRef.current;
          const next = {
            ...current,
            price: Number(selectedQuote.price),
            change: Number(selectedQuote.change),
            name: selectedQuote.name || current.name,
            marketTime: selectedQuote.marketTime
          };
          selectedStockRef.current = next;
          setSelectedStock(next);
          setChartCandles((currentCandles) => {
            if (!currentCandles.length) return currentCandles;
            const nextCandles = [...currentCandles];
            const lastIndex = nextCandles.length - 1;
            const latest = nextCandles[lastIndex];
            nextCandles[lastIndex] = {
              ...latest,
              timestamp: Math.floor(Date.now() / 1000),
              close: next.price,
              high: Math.max(latest.high, next.price),
              low: Math.min(latest.low, next.price)
            };
            return nextCandles;
          });
        }

        setLiveMarketConnected(true);
        setLiveMarketError("");
      } catch (error) {
        if (isActive) {
          setLiveMarketConnected(false);
          setLiveMarketError(error.message);
        }
      }
    };

    void fetchQuotes();
    const quoteTimer = window.setInterval(fetchQuotes, 15000);

    return () => {
      isActive = false;
      window.clearInterval(quoteTimer);
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    const fetchHistory = async () => {
      try {
        const data = await fetchMarketHistory(selectedStock.ticker, chartRange);
        if (!isActive || !Array.isArray(data.candles) || !data.candles.length) return;

        setChartCandles(data.candles);
        setChartHistoryConnected(true);
      } catch (error) {
        if (isActive) {
          setLiveMarketError(error.message);
        }
      }
    };

    void fetchHistory();
    const historyTimer = window.setInterval(fetchHistory, 30000);

    return () => {
      isActive = false;
      window.clearInterval(historyTimer);
    };
  }, [selectedStock.ticker, chartRange]);

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

    const controller = new AbortController();
    const headers = getAuthHeaders();

    const loadTradingData = async () => {
      const endpoints = [
        ["/test-holdings", setHoldings, setLoading],
        ["/test-orders", setOrders, setOrdersLoading],
        ["/test-positions", setPositions, setPositionsLoading],
        ["/test-funds", setFunds, setFundsLoading]
      ];

      await Promise.all(endpoints.map(async ([endpoint, setData, setLoadingState]) => {
        try {
          const response = await fetch(apiUrl(endpoint), {
            headers,
            signal: controller.signal
          });
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Unable to load trading data");
          }

          if (endpoint === "/test-funds") {
            setData(data);
          } else if (Array.isArray(data) && data.length > 0) {
            setData(data);
          } else if (endpoint === "/test-holdings") {
            setHoldings(demoHoldings);
          } else if (endpoint === "/test-orders") {
            setOrders(demoOrders);
          } else if (endpoint === "/test-positions") {
            setPositions(demoPositions);
          }
        } catch (error) {
          if (error.name !== "AbortError") {
            if (!String(error.message).includes("401") &&
                !String(error.message).includes("Invalid or expired token")) {
              console.error(`Data load error (${endpoint}):`, error);
            }
            if (endpoint === "/test-funds") {
              setFundError(error.message);
              setFunds(demoFunds);
            } else if (endpoint === "/test-holdings") {
              setHoldings(demoHoldings);
            } else if (endpoint === "/test-orders") {
              setOrders(demoOrders);
            } else if (endpoint === "/test-positions") {
              setPositions(demoPositions);
            }
          }
        } finally {
          setLoadingState(false);
        }
      }));
    };

    void loadTradingData();

    return () => controller.abort();
  }, [navigate]);

  useEffect(() => {
    activeProtections.forEach((protection) => {
      if (protectionExecutions.current.has(protection.id)) return;

      const currentPrice = watchlist.find(
        (stock) => stock.symbol === protection.symbol
      )?.price;
      const triggerType =
        currentPrice <= protection.stopLoss && protection.stopLoss > 0
          ? "STOP_LOSS"
          : currentPrice >= protection.takeProfit && protection.takeProfit > 0
            ? "TAKE_PROFIT"
            : null;

      if (!triggerType || !Number.isFinite(currentPrice)) return;

      protectionExecutions.current.add(protection.id);
      const executionPrice =
        triggerType === "STOP_LOSS" ? protection.stopLoss : protection.takeProfit;
      const proceeds = executionPrice * protection.quantity;

      const executeProtection = async () => {
        try {
          const response = await fetch(apiUrl("/add-funds"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...getAuthHeaders()
            },
            body: JSON.stringify({ amount: proceeds })
          });
          const data = await response.json();

          if (!response.ok && response.status !== 401) {
            throw new Error(data.message || "Protective exit could not be completed.");
          }

          if (response.ok) {
            setFunds(data.funds);
          } else {
            setFunds((current) => ({
              ...current,
              availableBalance: Number(current?.availableBalance || 0) + proceeds
            }));
          }

          setHoldings((current) =>
            current
              .map((holding) =>
                holding.name === protection.name
                  ? {
                      ...holding,
                    qty: Number(holding.qty ?? holding.quantity ?? 0) -
                        protection.quantity
                    }
                  : holding
              )
              .filter((holding) => Number(holding.qty ?? holding.quantity ?? 0) > 0)
          );
          setPositions((current) =>
            current
              .map((position) =>
                position.name === protection.symbol
                  ? {
                      ...position,
                    qty: Number(position.qty ?? position.quantity ?? 0) -
                        protection.quantity
                    }
                  : position
              )
              .filter((position) => Number(position.qty ?? position.quantity ?? 0) > 0)
          );
          setOrders((current) => [
            {
              _id: `demo-order-${Date.now()}`,
              name: protection.name,
              qty: protection.quantity,
              price: executionPrice,
              mode: "SELL",
              orderType: triggerType,
              status: "Completed"
            },
            ...current
          ]);
          setTradeMarkers((current) => [
            ...current.slice(-7),
            {
              id: `protect-${Date.now()}`,
              mode: "SELL",
              symbol: protection.symbol,
              price: executionPrice
            }
          ]);
          setActiveProtections((current) =>
            current.filter((item) => item.id !== protection.id)
          );
          setToast(
            `${triggerType === "STOP_LOSS" ? "Stop-Loss" : "Take-Profit"} triggered for ${protection.symbol} · simulated exit @ ₹${executionPrice.toLocaleString("en-IN")}`
          );
          window.setTimeout(() => setToast(""), 5000);
        } catch (error) {
          console.error("Protective exit error:", error);
          setToast(`Protective exit failed: ${error.message}`);
          window.setTimeout(() => setToast(""), 5000);
        } finally {
          protectionExecutions.current.delete(protection.id);
        }
      };

      void executeProtection();
    });
  }, [activeProtections, watchlist]);

  const fetchFunds = async () => {
    setFundsLoading(true);

    try {
      const response = await fetch(apiUrl("/test-funds"), {
        headers: getAuthHeaders()
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch funds");
      }

      setFunds(data);
      setFundError("");
    } catch (error) {
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

      const response = await fetch(apiUrl(endpoint), {
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

  const selectedHolding = holdings.find(
    (holding) => holding.name === selectedStock.name
  );
  const selectedQuantity = Number(selectedHolding?.qty || selectedHolding?.quantity || 0);
  const selectedAverage = Number(
    selectedHolding?.avg || selectedHolding?.avgPrice || selectedStock.price
  );
  const selectedTradeProfit =
    selectedQuantity * (selectedStock.price - selectedAverage);

  const displayName = (
    user?.name ||
    user?.fullName ||
    user?.email?.split("@")[0] ||
    "Trader"
  ).trim().split(/\s+/)[0];

  // Demo Buy/Sell
  const handleTrade = (type) => {
    setTradeQuantity("1");
    setTradeMessage("");
    setOrderType("MARKET");
    setLimitPrice(selectedStock.price.toString());
    setStopLossPrice("");
    setTakeProfitPrice("");
    setTradeModal(type);
  };

  const placeDemoOrder = async () => {
    const quantity = Number(tradeQuantity);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      setTradeMessage("Enter a valid quantity.");
      return;
    }

    const executionPrice =
      orderType === "LIMIT" && Number(limitPrice) > 0
        ? Number(limitPrice)
        : selectedStock.price;

    if (orderType === "LIMIT" && (!Number.isFinite(executionPrice) || executionPrice <= 0)) {
      setTradeMessage("Enter a valid limit price.");
      return;
    }

    const stopLoss = stopLossPrice === "" ? 0 : Number(stopLossPrice);
    const takeProfit = takeProfitPrice === "" ? 0 : Number(takeProfitPrice);

    if (
      tradeModal === "BUY" &&
      ((stopLossPrice !== "" && (!Number.isFinite(stopLoss) || stopLoss <= 0 || stopLoss >= executionPrice)) ||
        (takeProfitPrice !== "" && (!Number.isFinite(takeProfit) || takeProfit <= executionPrice)))
    ) {
      setTradeMessage("For a long position, Stop-Loss must be below entry and Take-Profit above entry.");
      return;
    }

    const orderValue = quantity * executionPrice;
    const existingHolding = holdings.find(
      (holding) => holding.name === selectedStock.name
    );

    if (
      tradeModal === "SELL" &&
      (!existingHolding || Number(existingHolding.qty ?? existingHolding.quantity ?? 0) < quantity)
    ) {
      setTradeMessage("Not enough quantity available to sell.");
      return;
    }

    if (
      tradeModal === "BUY" &&
      Number(funds?.availableBalance || 0) < orderValue
    ) {
      setTradeMessage("Insufficient available balance.");
      return;
    }

    try {
      const endpoint = tradeModal === "BUY" ? "/withdraw-funds" : "/add-funds";
      const response = await fetch(apiUrl(endpoint), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders()
        },
        body: JSON.stringify({ amount: orderValue })
      });
      const data = await response.json();

      if (!response.ok) {
        if (response.status !== 401) {
          throw new Error(data.message || "Order could not be placed.");
        }

        setFunds((current) => ({
          ...current,
          availableBalance: Math.max(
            0,
            Number(current?.availableBalance || 0) +
              (tradeModal === "BUY" ? -orderValue : orderValue)
          ),
          totalDeposited: Number(current?.totalDeposited || 0),
          totalWithdrawn:
            Number(current?.totalWithdrawn || 0) +
            (tradeModal === "BUY" ? orderValue : 0)
        }));
      } else {
        setFunds(data.funds);
      }

      if (tradeModal === "BUY") {
        setHoldings((current) => {
          if (existingHolding) {
            return current.map((holding) =>
              holding.name === selectedStock.name
                ? {
                    ...holding,
                    qty: Number(holding.qty ?? holding.quantity ?? 0) + quantity,
                    avg: (
                      ((holding.avg || holding.avgPrice || holding.price || executionPrice) *
                        Number(holding.qty ?? holding.quantity ?? 0) +
                        executionPrice * quantity) /
                      (Number(holding.qty ?? holding.quantity ?? 0) + quantity)
                    ).toFixed(2)
                  }
                : holding
            );
          }

          return [
            ...current,
            {
              _id: `demo-${Date.now()}`,
              name: selectedStock.name,
              qty: quantity,
              avg: executionPrice,
              price: executionPrice
            }
          ];
        });

        if (stopLoss > 0 || takeProfit > 0) {
          setActiveProtections((current) => [
            ...current,
            {
              id: `protection-${Date.now()}`,
              name: selectedStock.name,
              symbol: selectedStock.symbol,
              quantity,
              entryPrice: executionPrice,
              stopLoss,
              takeProfit
            }
          ]);
        }

        setPositions((current) => [
          ...current,
          {
            _id: `demo-pos-${Date.now()}`,
            name: selectedStock.symbol,
            qty: quantity,
            avg: selectedStock.price,
            price: selectedStock.price,
            net: 0
          }
        ]);
      } else {
        setHoldings((current) =>
          current
            .map((holding) =>
              holding.name === selectedStock.name
                ? {
                    ...holding,
                    qty: Number(holding.qty ?? holding.quantity ?? 0) - quantity
                  }
                : holding
            )
            .filter((holding) => Number(holding.qty ?? holding.quantity ?? 0) > 0)
        );
        setActiveProtections((current) => {
          let remainingToSell = quantity;
          return current.flatMap((protection) => {
            if (protection.symbol !== selectedStock.symbol || remainingToSell <= 0) {
              return [protection];
            }

            const reduction = Math.min(protection.quantity, remainingToSell);
            remainingToSell -= reduction;
            const remainingQuantity = protection.quantity - reduction;
            return remainingQuantity > 0
              ? [{ ...protection, quantity: remainingQuantity }]
              : [];
          });
        });
      }

      setOrders((current) => [
        {
          _id: `demo-order-${Date.now()}`,
          name: selectedStock.name,
          qty: quantity,
          price: executionPrice,
          mode: tradeModal,
          orderType,
          status: "Completed"
        },
        ...current
      ]);

      setToast(
        `${tradeModal} ${quantity} ${selectedStock.symbol} @ ₹${executionPrice.toLocaleString("en-IN")} completed`
      );
      window.setTimeout(() => setToast(""), 3500);

      const tradeMove = tradeModal === "BUY" ? 0.001 : -0.001;
      const nextPrice = Number((selectedStock.price * (1 + tradeMove)).toFixed(2));

      setWatchlist((current) =>
        current.map((stock) =>
          stock.symbol === selectedStock.symbol
            ? {
                ...stock,
                price: nextPrice,
                change: Number((stock.change + tradeMove * 100).toFixed(2))
              }
            : stock
        )
      );

      const nextSelectedStock = {
        ...selectedStock,
        price: nextPrice,
        change: Number((selectedStock.change + tradeMove * 100).toFixed(2))
      };
      selectedStockRef.current = nextSelectedStock;
      setSelectedStock(nextSelectedStock);

      setChartCandles((current) => {
        if (!current.length) return current;
        const next = [...current];
        const previous = next[next.length - 1];
        const close = Number((previous.close * (1 + tradeMove)).toFixed(2));
        next[next.length - 1] = {
          ...previous,
          open: previous.open,
          close,
          high: Math.max(previous.high, close),
          low: Math.min(previous.low, close)
        };
        return next;
      });

      setTradeMarkers((current) => [
        ...current.slice(-7),
        {
          id: `trade-${Date.now()}`,
          mode: tradeModal,
          symbol: selectedStock.symbol,
          price: nextPrice
        }
      ]);

      setTradeMessage(
        `${tradeModal} order for ${quantity} ${selectedStock.symbol} shares completed.`
      );
    } catch (error) {
      setTradeMessage(error.message);
    }
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

        <span>
          NIFTY 50 <b>{niftyIndex.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b>
          <em className={niftyIndex.change >= 0 ? "positive" : "negative"}>
            {niftyIndex.change >= 0 ? "+" : ""}{niftyIndex.change.toFixed(2)}%
          </em>
        </span>

        <span>
          SENSEX <b>{sensexIndex.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b>
          <em className={sensexIndex.change >= 0 ? "positive" : "negative"}>
            {sensexIndex.change >= 0 ? "+" : ""}{sensexIndex.change.toFixed(2)}%
          </em>
        </span>

        <small>
          {liveMarketConnected ? "Live NSE Market Data" : liveMarketError ? "Demo fallback" : "Connecting..."}
        </small>

      </div>

      <main className="trading-main">

        {/* Welcome */}
        <div className="trading-heading">

          <div>
            <p>WELCOME TO FINORA</p>

            <h1>
              Hello, {displayName} 👋
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

            <MarketWatch
              stocks={watchlist}
              selectedSymbol={selectedStock.symbol}
              search={search}
              setSearch={setSearch}
              favoriteSymbols={favoriteSymbols}
              setFavoriteSymbols={setFavoriteSymbols}
              onSelectStock={(stock) => {
                selectedStockRef.current = stock;
                setSelectedStock(stock);
                setChartHistoryConnected(false);
                setChartCandles(createDemoCandles(stock.price, chartRange));
                setDrawingPoints([]);
              }}
            />

            <TradingChart
              selectedStock={selectedStock}
              chartCandles={chartCandles}
              chartRange={chartRange}
              onTimeframeChange={(range) => {
                setChartRange(range);
                setChartHistoryConnected(false);
                setChartCandles(createDemoCandles(selectedStock.price, range));
                setCrosshair(null);
                setDrawingPoints([]);
              }}
              chartType={chartType}
              setChartType={setChartType}
              indicator={indicator}
              setIndicator={setIndicator}
              drawingTool={drawingTool}
              setDrawingTool={setDrawingTool}
              crosshair={crosshair}
              setCrosshair={setCrosshair}
              drawingPoints={drawingPoints}
              setDrawingPoints={setDrawingPoints}
              chartZoom={chartZoom}
              setChartZoom={setChartZoom}
              selectedQuantity={selectedQuantity}
              selectedTradeProfit={selectedTradeProfit}
              activeProtections={activeProtections}
              tradeMarkers={tradeMarkers}
              historyConnected={chartHistoryConnected}
              formatMoney={formatMoney}
              onBuy={() => handleTrade("BUY")}
              onSell={() => handleTrade("SELL")}
            />

          </section>

        )}

        {activeTab === "Holdings" && (
          <HoldingsPanel holdings={holdings} loading={loading} />
        )}

        {activeTab === "Orders" && (
          <OrdersPanel orders={orders} loading={ordersLoading} />
        )}

        {activeTab === "Positions" && (
          <PositionsPanel positions={positions} loading={positionsLoading} />
        )}

        {activeTab === "Funds" && (
          <FundsPanel
            funds={funds}
            loading={fundsLoading}
            amount={amount}
            setAmount={setAmount}
            error={fundError}
            message={fundMessage}
            clearMessages={() => {
              setFundMessage("");
              setFundError("");
            }}
            actionLoading={fundActionLoading}
            onRefresh={fetchFunds}
            onTransaction={handleFundTransaction}
            formatMoney={formatMoney}
          />
        )}

      </main>

      <TradeOrderModal
        tradeType={tradeModal}
        selectedStock={selectedStock}
        orderType={orderType}
        setOrderType={setOrderType}
        limitPrice={limitPrice}
        setLimitPrice={setLimitPrice}
        tradeQuantity={tradeQuantity}
        setTradeQuantity={setTradeQuantity}
        stopLossPrice={stopLossPrice}
        setStopLossPrice={setStopLossPrice}
        takeProfitPrice={takeProfitPrice}
        setTakeProfitPrice={setTakeProfitPrice}
        tradeMessage={tradeMessage}
        setTradeMessage={setTradeMessage}
        setTradeModal={setTradeModal}
        placeDemoOrder={placeDemoOrder}
      />

      {toast && (
        <div className="trading-toast" role="status">
          <span>✓</span>
          {toast}
        </div>
      )}

      <footer className="trading-footer">
        © 2026 FINORA Technologies. All rights reserved.
        <span>Invest Smart. Trade Better.</span>
      </footer>

    </div>
  );
}

export default Trading;