import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CountDown, Skeleton } from "../UI";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [showItems, setShowItems] = useState([]);
  const [exploreItemsLoading, setExploreItemsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleItemCount, setVisibleItemCount] = useState(8);
  const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState(false);
  
  const handleIncrementByValue = (value) => {
    if (visibleItemCount < 16) {
      setVisibleItemCount(prevVisibleItemCount => prevVisibleItemCount + value);
    } else {
      setIsLoadMoreDisabled(true);
    }
  };

  useEffect(() => {
      setShowItems(exploreItems.slice(0,visibleItemCount));
  }, [visibleItemCount]);

  useEffect(() => {
    const abortController = new AbortController();

    const getExploreItems = async () => {
      try {
        setExploreItemsLoading(true);
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`, {
            signal: abortController.signal,
          }
        );
        setExploreItems(data);
        setShowItems(data.slice(0,visibleItemCount));
      } catch (e) {
        if(axios.isCancel(e)) {
          console.log('Request canceled: ', e.message);
        } else {
          console.error("Error fetching Explore Items data: ", e);
          setError(e);
        }
        setExploreItems([]);
        setShowItems([]);
      } finally {
        setTimeout(() => setExploreItemsLoading(false), 2000);
      }
    };
    
    getExploreItems();
    return() => {
      abortController.abort();
    };
  }, []);
  
  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
        {(exploreItems.length === 0)
        ? new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                  <Skeleton width = "50px" height = "50px" borderRadius = "50%"></Skeleton>
                  <i className="fa fa-check"></i>
              </div>
              <div className="nft__item_wrap">
                <Skeleton width="100%" height="100%" borderRadius="0"></Skeleton>
              </div>
              <div className="nft__item_info">
                <Skeleton width = "85%" height = "28px" borderRadius = "0" margin = "4px 0 0 0"></Skeleton>
                <div className="nft__item_price">
                  <Skeleton width = "35%" height = "18px" borderRadius = "0"></Skeleton>
                </div>
                <div className="nft__item_like">
                  <i><Skeleton width = "30px" height = "15px" borderRadius = "0" ></Skeleton></i>
                </div>
              </div>
            </div>
          </div>
        ))
        : showItems.map(
          ({ id, authorId, authorImage, nftImage, nftId, title, price, likes, expiryDate }) => (
          <div
            key={id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {expiryDate ? <CountDown expires={expiryDate} key={exploreItemsLoading}/> : null }

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to={`/item-details/${nftId}`}>
                  <img src={nftImage} className="lazy nft__item_preview" alt="" />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${nftId}`}>
                  <h4>{title}</h4>
                </Link>
                <div className="nft__item_price">{price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{likes}</span>
                </div>
              </div>
            </div>
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
