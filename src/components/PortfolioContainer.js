import React from "react";
import PortfolioStock from "./PortfolioStock";

function PortfolioContainer({portfolioState, handleStockSell}) {
  const portfolioStock = portfolioState.map((stock) => {
    return <PortfolioStock key={stock.id} stock={stock} handleStockSell={handleStockSell} />
  })

  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolioStock}
    </div>
  );
}

export default PortfolioContainer;
