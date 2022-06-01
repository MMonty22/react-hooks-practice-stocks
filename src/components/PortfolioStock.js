import React from "react";

function PortfolioStock({stock, handleStockSell}) {

    function handleSellClick() {
        handleStockSell(stock)
      }

  return (
    <div>
      <div className="card">
        <div onClick={handleSellClick} className="card-body">
          <h5 className="card-title">{stock.name}</h5>
          <p className="card-text">{stock.ticker}: {stock.price}</p>
        </div>
      </div>
    </div>
  );
}
export default PortfolioStock;
