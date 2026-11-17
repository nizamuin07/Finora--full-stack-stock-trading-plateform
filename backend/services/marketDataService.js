const quoteCache = new Map();
const historyCache = new Map();
const CACHE_DURATION_MS = 15_000;

const toYahooSymbol = (symbol) =>
  symbol.startsWith("^")
    ? symbol
    : symbol.includes(".")
      ? symbol
      : `${symbol}.NS`;

const fetchYahooJson = async (url, timeoutMs) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json"
      },
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Market provider returned ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
};

const fetchMarketQuote = async (symbol) => {
  const yahooSymbol = toYahooSymbol(symbol);
  const cached = quoteCache.get(yahooSymbol);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION_MS) {
    return cached.value;
  }

  const payload = await fetchYahooJson(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol)}?range=1d&interval=5m`,
    8000
  );
  const result = payload?.chart?.result?.[0];
  if (!result) throw new Error("Market data not found");

  const meta = result.meta;
  const quote = {
    symbol,
    yahooSymbol,
    price: Number(meta.regularMarketPrice || meta.previousClose || 0),
    previousClose: Number(meta.chartPreviousClose || meta.previousClose || 0),
    change: Number(meta.regularMarketChangePercent || 0),
    currency: meta.currency || "INR",
    exchange: meta.fullExchangeName || meta.exchangeName || "NSE",
    name: meta.longName || meta.shortName || symbol,
    marketTime: meta.regularMarketTime
      ? new Date(meta.regularMarketTime * 1000).toISOString()
      : null
  };

  quoteCache.set(yahooSymbol, { timestamp: Date.now(), value: quote });
  return quote;
};

const historyRanges = {
  "1m": ["1d", "1m"],
  "5m": ["5d", "5m"],
  "15m": ["1mo", "15m"],
  "1H": ["3mo", "60m"],
  "1D": ["1y", "1d"],
  "1W": ["5y", "1wk"],
  "1M": ["10y", "1mo"]
};

const getHistoryConfiguration = (timeframe) => {
  const selectedTimeframe = historyRanges[timeframe] ? timeframe : "1D";
  const [range, interval] = historyRanges[selectedTimeframe];
  return { range, interval, timeframe: selectedTimeframe };
};

const fetchMarketHistory = async (symbol, timeframe) => {
  const configuration = getHistoryConfiguration(timeframe);
  const selectedTimeframe = configuration.timeframe;
  const cacheKey = `${symbol}:${selectedTimeframe}`;
  const cached = historyCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION_MS) {
    return cached.value;
  }

  const yahooSymbol = toYahooSymbol(symbol);
  const payload = await fetchYahooJson(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol)}?range=${configuration.range}&interval=${configuration.interval}`,
    10_000
  );
  const result = payload?.chart?.result?.[0];
  const timestamps = result?.timestamp || [];
  const quote = result?.indicators?.quote?.[0];
  if (!quote) throw new Error("Chart data not found");

  const candles = timestamps
    .map((timestamp, index) => ({
      timestamp,
      open: Number(quote.open?.[index]),
      high: Number(quote.high?.[index]),
      low: Number(quote.low?.[index]),
      close: Number(quote.close?.[index]),
      volume: Number(quote.volume?.[index] || 0)
    }))
    .filter((candle) =>
      Number.isFinite(candle.open) &&
      Number.isFinite(candle.high) &&
      Number.isFinite(candle.low) &&
      Number.isFinite(candle.close) &&
      candle.open > 0 &&
      candle.high > 0 &&
      candle.low > 0 &&
      candle.close > 0
    );

  const history = { symbol, yahooSymbol, timeframe: selectedTimeframe, candles };
  historyCache.set(cacheKey, { timestamp: Date.now(), value: history });
  return history;
};

module.exports = {
  fetchMarketHistory,
  fetchMarketQuote,
  getHistoryConfiguration
};
