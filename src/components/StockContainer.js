import React from "react";
import Stock from "./Stock";

function StockContainer({stocks, handleStockBuy}) {
  const singleStock = stocks.map((stock) => {
    return <Stock key={stock.id} stock={stock} handleStockBuy={handleStockBuy} />
  })

  return (
    <div>
      <h2>Stocks</h2>
      {singleStock}
    </div>
  );
}

export default StockContainer;
