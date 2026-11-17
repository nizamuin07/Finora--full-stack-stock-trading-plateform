import { apiUrl } from "../../services/api";

const requestJson = async (url, signal) => {
  const response = await fetch(url, { signal });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Market data request failed.");
  }

  return data;
};

export const fetchMarketQuotes = (symbols, signal) =>
  requestJson(
    apiUrl(`/api/market/quotes?symbols=${encodeURIComponent(symbols.join(","))}`),
    signal
  );

export const fetchMarketHistory = (symbol, timeframe, signal) =>
  requestJson(
    apiUrl(`/api/market/history/${encodeURIComponent(symbol)}?timeframe=${encodeURIComponent(timeframe)}`),
    signal
  );
