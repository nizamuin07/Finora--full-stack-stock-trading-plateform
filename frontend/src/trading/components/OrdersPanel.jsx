function OrdersPanel({ orders, loading }) {
  return (
    <section className="trading-panel data-panel">
      <h3>My Orders</h3>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Mode</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.name || order.stock || "-"}</td>
                  <td>{order.qty ?? order.quantity ?? "-"}</td>
                  <td>₹{order.price ?? "-"}</td>
                  <td>{order.mode || order.type || "-"}</td>
                  <td>{order.orderType || "MARKET"}</td>
                  <td>{order.status || "Completed"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default OrdersPanel;
