function FundsPanel({
  funds,
  loading,
  amount,
  setAmount,
  error,
  message,
  clearMessages,
  actionLoading,
  onRefresh,
  onTransaction,
  formatMoney
}) {
  return (
    <section className="funds-section">
      <div className="funds-heading">
        <div>
          <h2>My Funds</h2>
          <p>Manage your FINORA account balance.</p>
        </div>
        <button className="fund-refresh" onClick={onRefresh} disabled={loading}>
          ↻ Refresh
        </button>
      </div>

      {loading ? (
        <div className="trading-panel">Loading funds...</div>
      ) : funds ? (
        <>
          <div className="funds-cards">
            <div className="funds-card balance-card">
              <p>Available Balance</p>
              <h2>₹{formatMoney(funds.availableBalance)}</h2>
              <span>Available for trading</span>
            </div>
            <div className="funds-card">
              <p>Total Deposited</p>
              <h2>₹{formatMoney(funds.totalDeposited)}</h2>
              <span>Total amount added</span>
            </div>
            <div className="funds-card">
              <p>Total Withdrawn</p>
              <h2>₹{formatMoney(funds.totalWithdrawn)}</h2>
              <span>Total amount withdrawn</span>
            </div>
          </div>

          <div className="trading-panel funds-action-panel">
            <h3>Manage Your Funds</h3>
            <p>Enter the amount you want to add or withdraw.</p>
            <div className="fund-input-group">
              <label htmlFor="fund-amount">Amount (₹)</label>
              <input
                id="fund-amount"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Enter amount"
                value={amount}
                onChange={(event) => {
                  setAmount(event.target.value);
                  clearMessages();
                }}
              />
            </div>

            {error && <div className="fund-error">{error}</div>}
            {message && <div className="fund-success">{message}</div>}

            <div className="fund-buttons">
              <button
                className="add-fund-btn"
                onClick={() => onTransaction("add")}
                disabled={actionLoading}
              >
                {actionLoading ? "Processing..." : "+ Add Funds"}
              </button>
              <button
                className="withdraw-fund-btn"
                onClick={() => onTransaction("withdraw")}
                disabled={actionLoading}
              >
                {actionLoading ? "Processing..." : "− Withdraw Funds"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="trading-panel">
          <p>Unable to load funds. Please try again.</p>
          <p>{error}</p>
          <button onClick={onRefresh}>Retry</button>
        </div>
      )}
    </section>
  );
}

export default FundsPanel;
