import React, {useEffect, useState} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [portfolioState, setPortfolioState] = useState([])
  const [isSortedByName, setIsSortedByName] = useState(false)
  const [isSortedByPrice, setIsSortedByPrice] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
    .then(res => res.json())
    .then(data => setStocks(data))
  }, [])

  function handleStockBuy(boughtStock) {
    const stockInPortfolio = portfolioState.find((stock) => stock.id === boughtStock.id)
    if (!stockInPortfolio) {
      setPortfolioState([...portfolioState, boughtStock])
    }
  }

  function handleStockSell(stockToSell) {
    const portfolioStocks = portfolioState.filter((stock) => stock.id !== stockToSell.id)
    setPortfolioState(portfolioStocks)
  }

  const sortByName = () => {
    setIsSortedByName(!isSortedByName)
    setIsSortedByPrice(false)
  }

  const sortByPrice = () => {
    setIsSortedByPrice(!isSortedByPrice)
    setIsSortedByName(false)
  }

  function handleSort(array, property) {
    return array.sort((a,b) => {
      if (a[property] > b[property]) {
        return 1
      }
      if (a[property] < b[property]) {
        return -1
      }
      return 0
    })
  }

  const sortedStocks = () => {
    if (isSortedByName) {
      return handleSort(stocks, "ticker")
    }
    if (isSortedByPrice) {
      return handleSort (stocks, "price")
    }
    const filteredList = stocks.filter((stock) => {
      if (selectedCategory === "All") {
        return stocks
      }
      return stock.type === selectedCategory})
    return filteredList
  }

  function filterByType(event) {
    setSelectedCategory(event.target.value)
  }

  return (
    <div>
      <SearchBar sortByName={sortByName} sortByPrice={sortByPrice} filterByType={filterByType}/>
      <div className="row">
        <div className="col-8"> 
          <StockContainer stocks={sortedStocks()} handleStockBuy={handleStockBuy}/>
        </div>
        <div className="col-4">
          <PortfolioContainer portfolioState={portfolioState} handleStockSell={handleStockSell}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
