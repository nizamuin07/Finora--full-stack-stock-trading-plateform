function MarketWatch({
  stocks,
  selectedSymbol,
  search,
  setSearch,
  favoriteSymbols,
  setFavoriteSymbols,
  onSelectStock
}) {
  const filteredStocks = stocks.filter((stock) =>
    stock.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="trading-panel watchlist-panel">
      <div className="panel-heading">
        <div>
          <h3>Market Watch</h3>
          <p>Explore popular stocks</p>
        </div>
        <span>{stocks.length} Stocks</span>
      </div>

      <input
        className="stock-search"
        type="text"
        placeholder="Search stocks..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="watchlist-items">
        {filteredStocks.map((stock) => (
          <div
            key={stock.symbol}
            className={`watchlist-item ${selectedSymbol === stock.symbol ? "selected" : ""}`}
            onClick={() => onSelectStock(stock)}
          >
            <button
              type="button"
              className={`watchlist-star ${favoriteSymbols.has(stock.symbol) ? "active" : ""}`}
              aria-label={`${favoriteSymbols.has(stock.symbol) ? "Remove" : "Add"} ${stock.symbol} ${favoriteSymbols.has(stock.symbol) ? "from" : "to"} favorites`}
              onClick={(event) => {
                event.stopPropagation();
                setFavoriteSymbols((current) => {
                  const next = new Set(current);
                  if (next.has(stock.symbol)) {
                    next.delete(stock.symbol);
                  } else {
                    next.add(stock.symbol);
                  }
                  return next;
                });
              }}
            >
              {favoriteSymbols.has(stock.symbol) ? "★" : "☆"}
            </button>
            <div>
              <strong>{stock.symbol}</strong>
              <small>{stock.name}</small>
            </div>
            <div className="stock-price">
              <strong>₹{stock.price.toLocaleString("en-IN")}</strong>
              <small className={stock.change >= 0 ? "positive" : "negative"}>
                {stock.change > 0 ? "+" : ""}
                {stock.change}%
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketWatch;
