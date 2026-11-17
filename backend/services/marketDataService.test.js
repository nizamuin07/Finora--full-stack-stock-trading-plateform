const test = require("node:test");
const assert = require("node:assert/strict");
const { getHistoryConfiguration } = require("./marketDataService");

test("market candle intervals map to matching history windows", () => {
  assert.deepEqual(getHistoryConfiguration("1m"), {
    range: "1d",
    interval: "1m",
    timeframe: "1m"
  });
  assert.deepEqual(getHistoryConfiguration("15m"), {
    range: "1mo",
    interval: "15m",
    timeframe: "15m"
  });
  assert.deepEqual(getHistoryConfiguration("1H"), {
    range: "3mo",
    interval: "60m",
    timeframe: "1H"
  });
  assert.deepEqual(getHistoryConfiguration("1D"), {
    range: "1y",
    interval: "1d",
    timeframe: "1D"
  });
  assert.deepEqual(getHistoryConfiguration("1W"), {
    range: "5y",
    interval: "1wk",
    timeframe: "1W"
  });
  assert.deepEqual(getHistoryConfiguration("1M"), {
    range: "10y",
    interval: "1mo",
    timeframe: "1M"
  });
});

test("unknown chart timeframes use the daily configuration", () => {
  assert.deepEqual(getHistoryConfiguration("invalid"), {
    range: "1y",
    interval: "1d",
    timeframe: "1D"
  });
});
