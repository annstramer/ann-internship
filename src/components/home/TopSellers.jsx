import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Skeleton } from "../UI";


const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [topSellersLoading, setTopSellersLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;
    let timeoutId = null;

    const getTopSellers = async () => {
      try {
        setTopSellersLoading(true);
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`, {
            signal: abortController.signal,
          }
        );
        if (isMounted) {
          setTopSellers(data);
        }
      } catch (e) {
        if(axios.isCancel(e)) {
          console.log('Request canceled: ', e.message);
        } else {
          console.error("Error fetching Top Sellers data: ", e);
          if (isMounted) {
            setError(e);
          }
        }
        if (isMounted) {
          setTopSellers([]);
        }
      } finally {
        timeoutId = setTimeout(() => {
          if (isMounted) {
            setTopSellersLoading(false)
          }
        }, 2000);
      }
    };

    getTopSellers();
    return() => {
      isMounted = false;
      abortController.abort();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
            {(topSellers.length === 0)
            ?
              new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton width = "50px" height = "50px" borderRadius = "50%"></Skeleton>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <Skeleton width = "100px" height = "20px" borderRadius = "0"></Skeleton>
                        <span><Skeleton width = "40px" height = "20px" borderRadius = "0"></Skeleton></span>
                      </div>
                    </li>
              ))
            :
              topSellers.map(
                ({ id, authorName, authorImage, authorId, price }) => (
                    <li key={id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${authorId}`}>{authorName}</Link>
                        <span>{price} ETH</span>
                      </div>
                    </li>
                ))
              }
              </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
