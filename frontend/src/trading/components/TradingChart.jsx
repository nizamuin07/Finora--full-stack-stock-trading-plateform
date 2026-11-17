import {
  formatAxisPrice,
  formatTimeLabel,
  getIndicatorValues,
  getPriceDomain,
  getVisibleCandles
} from "../utils/chartMath";

const chartBounds = {
  left: 52,
  right: 640,
  top: 20,
  bottom: 194,
  volumeTop: 207,
  volumeBottom: 235
};

function TradingChart({
  selectedStock,
  chartCandles,
  chartRange,
  onTimeframeChange,
  chartType,
  setChartType,
  indicator,
  setIndicator,
  drawingTool,
  setDrawingTool,
  crosshair,
  setCrosshair,
  drawingPoints,
  setDrawingPoints,
  chartZoom,
  setChartZoom,
  selectedQuantity,
  selectedTradeProfit,
  activeProtections,
  tradeMarkers,
  historyConnected,
  formatMoney,
  onBuy,
  onSell
}) {
  const candles = getVisibleCandles(chartCandles);
  const protections = activeProtections.filter(
    (protection) => protection.symbol === selectedStock.symbol
  );
  const { minimum, maximum, range } = getPriceDomain(candles, selectedStock.price);
  const plotWidth = chartBounds.right - chartBounds.left;
  const plotHeight = chartBounds.bottom - chartBounds.top;
  const xForIndex = (index) =>
    candles.length < 2
      ? chartBounds.left + plotWidth / 2
      : chartBounds.left + (index * plotWidth) / (candles.length - 1);
  const yForPrice = (price) =>
    chartBounds.bottom - ((price - minimum) / range) * plotHeight;
  const maxVolume = Math.max(1, ...candles.map((candle) => candle.volume || 0));
  const latest = candles[candles.length - 1];
  const livePriceY = yForPrice(selectedStock.price);
  const candleWidth = Math.min(
    12,
    Math.max(3, (plotWidth / Math.max(candles.length, 1)) * 0.68)
  ) * chartZoom;
  const linePoints = candles
    .map((candle, index) => `${xForIndex(index)},${yForPrice(candle.close)}`)
    .join(" ");
  const indicatorPoints = getIndicatorValues(candles, indicator)
    .map((value, index) => `${xForIndex(index)},${yForPrice(value)}`);

  const timestampIndexes = [...new Set([
    0,
    Math.floor((candles.length - 1) / 2),
    candles.length - 1
  ])];
  const priceTicks = Array.from({ length: 5 }, (_, index) =>
    maximum - (index * range) / 4
  );

  return (
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
        <div className="chart-toolbox" aria-label="Chart drawing tools">
          {[
            ["cursor", "↖"],
            ["crosshair", "＋"],
            ["trendline", "╱"],
            ["measure", "⌁"]
          ].map(([tool, icon]) => (
            <button
              key={tool}
              type="button"
              className={drawingTool === tool ? "active" : ""}
              title={tool}
              onClick={() => {
                setDrawingTool(tool);
                setDrawingPoints([]);
              }}
            >
              {icon}
            </button>
          ))}
          <span className="chart-tool-divider" />
          <button
            type="button"
            title="Zoom out"
            onClick={() => setChartZoom((value) => Math.max(0.8, value - 0.1))}
          >
            −
          </button>
          <button
            type="button"
            title="Zoom in"
            onClick={() => setChartZoom((value) => Math.min(1.4, value + 0.1))}
          >
            +
          </button>
        </div>

        <div className="chart-toolbar">
          {["1m", "5m", "15m", "1H", "1D", "1W", "1M"].map((range) => (
            <button
              key={range}
              onClick={() => onTimeframeChange(range)}
              className={chartRange === range ? "active" : ""}
              type="button"
            >
              {range}
            </button>
          ))}
          <span className="chart-toolbar-divider" />
          <button
            type="button"
            className={chartType === "candles" ? "active" : ""}
            onClick={() => setChartType("candles")}
          >
            Candles
          </button>
          <button
            type="button"
            className={chartType === "line" ? "active" : ""}
            onClick={() => setChartType("line")}
          >
            Line
          </button>
          <select
            className="chart-indicator"
            value={indicator}
            onChange={(event) => setIndicator(event.target.value)}
            aria-label="Chart indicator"
          >
            <option value="none">Indicators</option>
            <option value="sma">SMA 20</option>
            <option value="ema">EMA 20</option>
          </select>
        </div>

        {selectedQuantity > 0 && (
          <div className="chart-position-pnl">
            <span>Position P&amp;L</span>
            <strong className={selectedTradeProfit >= 0 ? "positive" : "negative"}>
              {selectedTradeProfit >= 0 ? "+" : "-"}₹
              {formatMoney(Math.abs(selectedTradeProfit))}
            </strong>
          </div>
        )}

        <svg
          viewBox="0 0 720 270"
          preserveAspectRatio="none"
          className={`price-chart drawing-${drawingTool}`}
          aria-label={`${selectedStock.symbol} ${chartRange} ${chartType} chart`}
          onMouseMove={(event) => {
            if (drawingTool === "cursor") return;
            const rect = event.currentTarget.getBoundingClientRect();
            setCrosshair({
              x: Math.max(0, Math.min(720, ((event.clientX - rect.left) / rect.width) * 720)),
              y: Math.max(0, Math.min(270, ((event.clientY - rect.top) / rect.height) * 270))
            });
          }}
          onMouseLeave={() => setCrosshair(null)}
          onClick={(event) => {
            if (!["trendline", "measure"].includes(drawingTool)) return;
            const rect = event.currentTarget.getBoundingClientRect();
            const point = {
              x: ((event.clientX - rect.left) / rect.width) * 720,
              y: ((event.clientY - rect.top) / rect.height) * 270
            };
            setDrawingPoints((current) =>
              current.length >= 2 ? [point] : [...current, point]
            );
          }}
        >
          {priceTicks.map((tick, index) => {
            const y = chartBounds.top + (index * plotHeight) / 4;
            return (
              <g key={`price-tick-${index}`}>
                <line
                  x1={chartBounds.left}
                  x2={chartBounds.right}
                  y1={y}
                  y2={y}
                  stroke="#edf1f4"
                  strokeWidth="1"
                />
                <text x="650" y={y + 3} fill="#8b98a3" fontSize="9">
                  {formatAxisPrice(tick)}
                </text>
              </g>
            );
          })}

          {chartType === "candles" && candles.map((candle, index) => {
            const x = xForIndex(index);
            const openY = yForPrice(candle.open);
            const closeY = yForPrice(candle.close);
            const color = candle.close >= candle.open ? "#16a36b" : "#e05252";
            return (
              <g key={`${selectedStock.symbol}-${candle.timestamp || index}`}>
                <line
                  x1={x}
                  x2={x}
                  y1={yForPrice(candle.high)}
                  y2={yForPrice(candle.low)}
                  stroke={color}
                  strokeWidth="1.2"
                />
                <rect
                  x={x - candleWidth / 2}
                  y={Math.min(openY, closeY)}
                  width={candleWidth}
                  height={Math.max(Math.abs(closeY - openY), 1.5)}
                  rx="1"
                  fill={color}
                />
              </g>
            );
          })}

          {candles.map((candle, index) => {
            const volume = candle.volume || 0;
            const height = (volume / maxVolume) * (chartBounds.volumeBottom - chartBounds.volumeTop);
            return (
              <rect
                key={`volume-${selectedStock.symbol}-${candle.timestamp || index}`}
                x={xForIndex(index) - candleWidth / 2}
                y={chartBounds.volumeBottom - height}
                width={candleWidth}
                height={height}
                rx="1"
                fill={candle.close >= candle.open ? "#9ed7c1" : "#efb2b2"}
                opacity="0.7"
              />
            );
          })}

          {chartType === "line" && (
            <polyline
              points={linePoints}
              fill="none"
              stroke="#387ed1"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          )}

          {indicator !== "none" && (
            <polyline
              points={indicatorPoints.join(" ")}
              fill="none"
              stroke={indicator === "ema" ? "#f2a93b" : "#7b61ff"}
              strokeWidth="1.8"
              strokeDasharray={indicator === "ema" ? "5 3" : undefined}
            />
          )}

          {latest && (
            <g>
              <line
                x1={chartBounds.left}
                x2={chartBounds.right}
                y1={livePriceY}
                y2={livePriceY}
                stroke={selectedStock.change >= 0 ? "#16a36b" : "#e05252"}
                strokeWidth="1"
                strokeDasharray="5 4"
                opacity="0.8"
              />
              <circle
                cx={xForIndex(candles.length - 1)}
                cy={yForPrice(latest.close)}
                r="3"
                fill={selectedStock.change >= 0 ? "#16a36b" : "#e05252"}
              />
            </g>
          )}

          {protections.flatMap((protection) =>
            [
              { label: "SL", price: protection.stopLoss, color: "#e05252" },
              { label: "TP", price: protection.takeProfit, color: "#16a36b" }
            ]
              .filter((level) => level.price > 0)
              .map((level) => {
                const y = Math.max(
                  chartBounds.top,
                  Math.min(chartBounds.bottom, yForPrice(level.price))
                );
                return (
                  <g key={`${protection.id}-${level.label}`}>
                    <line
                      x1={chartBounds.left}
                      x2={chartBounds.right}
                      y1={y}
                      y2={y}
                      stroke={level.color}
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                    />
                    <text x={chartBounds.left + 4} y={y - 4} fill={level.color} fontSize="9" fontWeight="700">
                      {level.label} {formatAxisPrice(level.price)}
                    </text>
                  </g>
                );
              })
          )}

          {tradeMarkers
            .filter((marker) => marker.symbol === selectedStock.symbol)
            .slice(-4)
            .map((marker, index) => (
              <g key={marker.id}>
                <circle
                  cx={chartBounds.right - 12 - index * 24}
                  cy={Math.max(
                    chartBounds.top + 10,
                    Math.min(chartBounds.bottom - 10, yForPrice(marker.price || selectedStock.price))
                  )}
                  r="7"
                  fill={marker.mode === "BUY" ? "#16a36b" : "#e05252"}
                />
                <text
                  x={chartBounds.right - 12 - index * 24}
                  y={Math.max(
                    chartBounds.top + 13,
                    Math.min(chartBounds.bottom - 7, yForPrice(marker.price || selectedStock.price) + 3)
                  )}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="8"
                  fontWeight="800"
                >
                  {marker.mode === "BUY" ? "B" : "S"}
                </text>
              </g>
            ))}

          {drawingPoints.length === 1 && (
            <circle cx={drawingPoints[0].x} cy={drawingPoints[0].y} r="4" fill="#387ed1" />
          )}
          {drawingPoints.length === 2 && (
            <line
              x1={drawingPoints[0].x}
              y1={drawingPoints[0].y}
              x2={drawingPoints[1].x}
              y2={drawingPoints[1].y}
              stroke="#387ed1"
              strokeWidth="1.8"
            />
          )}
          {crosshair && (
            <g>
              <line x1={crosshair.x} x2={crosshair.x} y1={chartBounds.top} y2={chartBounds.volumeBottom} stroke="#91a0ab" strokeDasharray="3 3" />
              <line x1={chartBounds.left} x2={chartBounds.right} y1={crosshair.y} y2={crosshair.y} stroke="#91a0ab" strokeDasharray="3 3" />
            </g>
          )}

          {timestampIndexes.map((index) => {
            const candle = candles[index];
            if (!candle) return null;
            return (
              <text
                key={`time-${index}`}
                x={xForIndex(index)}
                y="257"
                textAnchor={index === 0 ? "start" : index === candles.length - 1 ? "end" : "middle"}
                fill="#8b98a3"
                fontSize="9"
              >
                {formatTimeLabel(candle.timestamp, chartRange)}
              </text>
            );
          })}
        </svg>

        {protections.length > 0 && (
          <span className="chart-protection-note">
            Dashed SL/TP lines · simulated exits only
          </span>
        )}
        <p>
          {historyConnected
            ? `Yahoo Finance history · ${chartRange} candles`
            : `Demo data · ${chartRange} candles`}
        </p>
      </div>

      <div className="trade-actions">
        <button onClick={onBuy}>BUY</button>
        <button onClick={onSell}>SELL</button>
      </div>
    </div>
  );
}

export default TradingChart;
