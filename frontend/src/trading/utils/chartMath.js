export const CHART_WINDOW_SIZE = 60;

export const getVisibleCandles = (candles, limit = CHART_WINDOW_SIZE) =>
  candles
    .filter((candle) =>
      [candle.open, candle.high, candle.low, candle.close].every(Number.isFinite)
    )
    .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))
    .slice(-limit);

export const getPriceDomain = (candles, currentPrice) => {
  const prices = candles.flatMap((candle) => [candle.high, candle.low]);
  if (Number.isFinite(currentPrice) && currentPrice > 0) prices.push(currentPrice);

  const rawMin = prices.length ? Math.min(...prices) : 0;
  const rawMax = prices.length ? Math.max(...prices) : 1;
  const padding = Math.max((rawMax - rawMin) * 0.06, rawMax * 0.0005);
  const minimum = Math.max(0, rawMin - padding);
  const maximum = rawMax + padding;

  return { minimum, maximum, range: maximum - minimum || 1 };
};

export const getIndicatorValues = (candles, indicator) => {
  let ema = candles[0]?.close || 0;

  return candles.map((candle, index) => {
    const alpha = 2 / 21;
    ema = index === 0 ? candle.close : candle.close * alpha + ema * (1 - alpha);
    const start = Math.max(0, index - 19);
    const window = candles.slice(start, index + 1);
    return indicator === "ema"
      ? ema
      : window.reduce((sum, item) => sum + item.close, 0) / window.length;
  });
};

export const formatAxisPrice = (value) =>
  `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 1 })}`;

export const formatTimeLabel = (timestamp, timeframe) => {
  if (!timestamp) return "";
  const date = new Date(Number(timestamp) * 1000);

  if (["1m", "5m", "15m", "1H"].includes(timeframe)) {
    return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  }
  if (timeframe === "1D") {
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  }
  return date.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
};
