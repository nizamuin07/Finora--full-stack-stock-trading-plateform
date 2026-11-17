function PositionsPanel({ positions, loading }) {
  return (
    <section className="trading-panel data-panel">
      <h3>My Positions</h3>
      {loading ? (
        <p>Loading positions...</p>
      ) : positions.length === 0 ? (
        <p>No positions available.</p>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Quantity</th>
                <th>Average Price</th>
                <th>Current Price</th>
                <th>P&amp;L</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => {
                const profitLoss = Number(position.net ?? position.pnl ?? 0);
                return (
                  <tr key={position._id}>
                    <td>{position.name || position.stock || "-"}</td>
                    <td>{position.qty ?? position.quantity ?? "-"}</td>
                    <td>₹{position.avg ?? position.avgPrice ?? "-"}</td>
                    <td>₹{position.price ?? "-"}</td>
                    <td className={profitLoss >= 0 ? "positive" : "negative"}>
                      ₹{position.net ?? position.pnl ?? "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default PositionsPanel;
