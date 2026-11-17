export const initialWatchlist = [
  { symbol: "RELIANCE", ticker: "RELIANCE", name: "Reliance Industries", price: 1250, change: 1.25 },
  { symbol: "TCS", ticker: "TCS", name: "Tata Consultancy", price: 3450, change: 1.20 },
  { symbol: "INFY", ticker: "INFY", name: "Infosys Limited", price: 1500, change: 0.85 },
  { symbol: "HDFCBANK", ticker: "HDFCBANK", name: "HDFC Bank", price: 1650, change: 0.65 },
  { symbol: "WIPRO", ticker: "WIPRO", name: "Wipro Limited", price: 430, change: -1.10 },
  { symbol: "ICICIBANK", ticker: "ICICIBANK", name: "ICICI Bank", price: 1280, change: 0.75 },
  { symbol: "ITC", ticker: "ITC", name: "ITC Limited", price: 465, change: -0.35 }
];

export const demoHoldings = [
  { _id: "demo-h1", name: "Reliance Industries", qty: 12, avg: 1180, price: 1250 },
  { _id: "demo-h2", name: "Tata Consultancy", qty: 6, avg: 3380, price: 3450 },
  { _id: "demo-h3", name: "HDFC Bank", qty: 10, avg: 1585, price: 1650 }
];

export const demoOrders = [
  { _id: "demo-o1", name: "HDFC Bank", qty: 10, price: 1650, mode: "BUY", status: "Completed" },
  { _id: "demo-o2", name: "Tata Consultancy", qty: 6, price: 3450, mode: "BUY", status: "Completed" }
];

export const demoPositions = [
  { _id: "demo-p1", name: "Reliance Industries", qty: 12, avg: 1180, price: 1250, net: 840 },
  { _id: "demo-p2", name: "TCS", qty: 6, avg: 3380, price: 3450, net: 420 }
];

export const demoFunds = {
  availableBalance: 54250,
  totalDeposited: 54250,
  totalWithdrawn: 0
};

const timeframeConfig = {
  "1m": { count: 60, volatility: 0.0007, intervalMs: 60_000 },
  "5m": { count: 60, volatility: 0.001, intervalMs: 5 * 60_000 },
  "15m": { count: 60, volatility: 0.0014, intervalMs: 15 * 60_000 },
  "1H": { count: 60, volatility: 0.0019, intervalMs: 60 * 60_000 },
  "1D": { count: 60, volatility: 0.0025, intervalMs: 24 * 60 * 60_000 },
  "1W": { count: 60, volatility: 0.004, intervalMs: 7 * 24 * 60 * 60_000 },
  "1M": { count: 60, volatility: 0.006, intervalMs: 30 * 24 * 60 * 60_000 }
};

export const createDemoCandles = (price, timeframe = "1D") => {
  const config = timeframeConfig[timeframe] || timeframeConfig["1D"];
  let previousPrice = price;
  const now = Date.now();

  return Array.from({ length: config.count }, (_, index) => {
    const movement = Math.sin(index * 0.72) * price * config.volatility;
    const open = previousPrice;
    const close = Math.max(0.01, open + movement);
    const spread = Math.max(price * config.volatility * 0.55, price * 0.0002);
    previousPrice = close;

    return {
      timestamp: Math.floor((now - (config.count - index - 1) * config.intervalMs) / 1000),
      open,
      close,
      high: Math.max(open, close) + spread,
      low: Math.max(0.01, Math.min(open, close) - spread),
      volume: 1000 + ((index * 7919) % 50000)
    };
  });
};
