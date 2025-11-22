import React, { useState, useEffect } from "react";
import axios from "axios";
import { NftItemCard, NftItemSkeleton } from "../UI";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [exploreItemsLoading, setExploreItemsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleItemCount, setVisibleItemCount] = useState(8);
  const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState(false);
  const [filterItems, setFilterItems] = useState('');
  const showItems = exploreItems.slice(0,visibleItemCount);

  const handleChangeFilter = (event) => {
    setFilterItems(event.target.value);
  }
  
  const handleIncrementByValue = (value) => {
    if (visibleItemCount < 16) {
      setVisibleItemCount(prevVisibleItemCount => prevVisibleItemCount + value);
    } else {
      setIsLoadMoreDisabled(true);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    const getExploreItems = async () => {
      try {
        setExploreItemsLoading(true);
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterItems}`, {
            signal: abortController.signal,
          }
        );
        setExploreItems(data);
      } catch (e) {
        if(axios.isCancel(e)) {
          console.log('Request canceled: ', e.message);
        } else {
          console.error("Error fetching Explore Items data: ", e);
          setError(e);
        }
        setExploreItems([]);
      } finally {
        setTimeout(() => setExploreItemsLoading(false), 2000);
      }
    };
    
    setVisibleItemCount(8);
    getExploreItems();
    return() => {
      abortController.abort();
    };
  }, [filterItems]);
  
  return (
    <>
      <div>
        <select id="filter-items" value={filterItems} onChange={handleChangeFilter}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
        {(exploreItemsLoading)
        ? new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <NftItemSkeleton index={index} />
          </div>
        ))
        : showItems.map(
          (item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <NftItemCard card={item} isLoading={exploreItemsLoading}/>
          </div>
          ))
        }
      <div className="col-md-12 text-center">
        <button id="loadmore" className="btn-main lead" 
          onClick={() => handleIncrementByValue(4)}
          disabled={isLoadMoreDisabled}>
          Load more
        </button>
      </div>
    </>
  );
};

export default ExploreItems;
