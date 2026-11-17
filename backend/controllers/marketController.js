const {
  fetchMarketHistory,
  fetchMarketQuote
} = require("../services/marketDataService");

const getQuotes = async (req, res) => {
  const symbols = String(req.query.symbols || "")
    .split(",")
    .map((symbol) => symbol.trim().toUpperCase())
    .filter(Boolean)
    .slice(0, 20);

  if (!symbols.length) {
    return res.status(400).json({ message: "At least one symbol is required." });
  }

  const results = await Promise.allSettled(
    symbols.map((symbol) => fetchMarketQuote(symbol))
  );
  const quotes = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

  if (!quotes.length) {
    return res.status(502).json({ message: "Unable to fetch market quotes." });
  }

  return res.json(quotes);
};

const getHistory = async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const timeframe = String(req.query.timeframe || "1D");

  try {
    const history = await fetchMarketHistory(symbol, timeframe);
    return res.json(history);
  } catch (error) {
    console.error("Market History Error:", error);
    return res.status(502).json({ message: "Unable to fetch market history." });
  }
};

module.exports = { getHistory, getQuotes };
