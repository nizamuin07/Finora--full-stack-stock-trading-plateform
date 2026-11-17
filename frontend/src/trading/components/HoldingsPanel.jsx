function HoldingsPanel({ holdings, loading }) {
  return (
    <section className="trading-panel data-panel">
      <h3>My Holdings</h3>
      {loading ? (
        <p>Loading holdings...</p>
      ) : holdings.length === 0 ? (
        <p>No holdings available.</p>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Quantity</th>
                <th>Average Price</th>
                <th>Current Price</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((stock) => (
                <tr key={stock._id}>
                  <td>{stock.name}</td>
                  <td>{stock.qty ?? stock.quantity ?? "-"}</td>
                  <td>₹{stock.avg ?? stock.avgPrice ?? "-"}</td>
                  <td>₹{stock.price ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default HoldingsPanel;
