import test from "node:test";
import assert from "node:assert/strict";
import {
  getIndicatorValues,
  getPriceDomain,
  getVisibleCandles
} from "./chartMath.js";
import { createDemoCandles } from "../data/marketData.js";

test("chart keeps the latest candles in chronological order", () => {
  const candles = Array.from({ length: 75 }, (_, index) => ({
    timestamp: 75 - index,
    open: 100,
    high: 102,
    low: 98,
    close: 101
  }));
  const visible = getVisibleCandles(candles);

  assert.equal(visible.length, 60);
  assert.equal(visible[0].timestamp, 16);
  assert.equal(visible.at(-1).timestamp, 75);
});

test("timeframes generate candle timestamps at the selected interval", () => {
  const minute = createDemoCandles(100, "1m");
  const daily = createDemoCandles(100, "1D");

  assert.equal(minute[1].timestamp - minute[0].timestamp, 60);
  assert.equal(daily[1].timestamp - daily[0].timestamp, 86400);
});

test("price scale includes the live price and indicators align with candles", () => {
  const candles = createDemoCandles(100, "1H").slice(-5);
  const domain = getPriceDomain(candles, 140);
  const sma = getIndicatorValues(candles, "sma");
  const ema = getIndicatorValues(candles, "ema");

  assert.ok(domain.minimum < 100);
  assert.ok(domain.maximum > 140);
  assert.equal(sma.length, candles.length);
  assert.equal(ema.length, candles.length);
  assert.ok(sma.every(Number.isFinite));
  assert.ok(ema.every(Number.isFinite));
});
