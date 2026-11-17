function TradeOrderModal({
  tradeType,
  selectedStock,
  orderType,
  setOrderType,
  limitPrice,
  setLimitPrice,
  tradeQuantity,
  setTradeQuantity,
  stopLossPrice,
  setStopLossPrice,
  takeProfitPrice,
  setTakeProfitPrice,
  tradeMessage,
  setTradeMessage,
  setTradeModal,
  placeDemoOrder
}) {
  if (!tradeType) return null;

  const isCompleted = tradeMessage.includes("completed");

  return (
    <div
      className="trade-modal-backdrop"
      role="presentation"
      onMouseDown={() => setTradeModal(null)}
    >
      <div
        className="trade-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${tradeType} ${selectedStock.symbol}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={`trade-modal-heading ${tradeType === "SELL" ? "sell" : ""}`}>
          <div>
            <p>{tradeType} ORDER</p>
            <h3>{selectedStock.symbol}</h3>
          </div>
          <button type="button" onClick={() => setTradeModal(null)}>×</button>
        </div>

        <div className="trade-modal-stock">
          <div>
            <span>LTP</span>
            <strong>₹{selectedStock.price.toLocaleString("en-IN")}</strong>
          </div>
          <span className={selectedStock.change >= 0 ? "positive" : "negative"}>
            {selectedStock.change >= 0 ? "+" : ""}
            {selectedStock.change}%
          </span>
        </div>

        <div className="trade-order-types">
          {["MARKET", "LIMIT"].map((type) => (
            <button
              key={type}
              type="button"
              className={orderType === type ? "active" : ""}
              onClick={() => setOrderType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {orderType === "LIMIT" && (
          <label>
            Limit Price
            <input
              type="number"
              min="0.01"
              step="0.05"
              value={limitPrice}
              onChange={(event) => setLimitPrice(event.target.value)}
            />
          </label>
        )}

        <label>
          Quantity
          <input
            type="number"
            min="1"
            step="1"
            value={tradeQuantity}
            onChange={(event) => {
              setTradeQuantity(event.target.value);
              setTradeMessage("");
            }}
          />
        </label>

        {tradeType === "BUY" && (
          <>
            <div className="protection-fields">
              <label>
                Stop-Loss (optional)
                <input
                  type="number"
                  min="0.01"
                  step="0.05"
                  placeholder={`Below ₹${selectedStock.price.toFixed(2)}`}
                  value={stopLossPrice}
                  onChange={(event) => {
                    setStopLossPrice(event.target.value);
                    setTradeMessage("");
                  }}
                />
              </label>
              <label>
                Take-Profit (optional)
                <input
                  type="number"
                  min="0.01"
                  step="0.05"
                  placeholder={`Above ₹${selectedStock.price.toFixed(2)}`}
                  value={takeProfitPrice}
                  onChange={(event) => {
                    setTakeProfitPrice(event.target.value);
                    setTradeMessage("");
                  }}
                />
              </label>
            </div>
            <p className="protection-disclaimer">
              Demo simulation only; these levels do not place broker orders.
            </p>
          </>
        )}

        <div className="trade-order-summary">
          <span>Estimated value</span>
          <strong>
            ₹{(
              Number(tradeQuantity || 0) *
              (orderType === "LIMIT" && Number(limitPrice) > 0
                ? Number(limitPrice)
                : selectedStock.price)
            ).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </strong>
        </div>

        {tradeMessage && (
          <div className={isCompleted ? "trade-success" : "trade-error"}>
            {tradeMessage}
          </div>
        )}

        <button
          type="button"
          className={`place-order-button ${tradeType === "SELL" ? "sell" : ""}`}
          onClick={isCompleted ? () => setTradeModal(null) : placeDemoOrder}
        >
          {isCompleted ? "Done" : `${tradeType} ${selectedStock.symbol}`}
        </button>
      </div>
    </div>
  );
}

export default TradeOrderModal;
