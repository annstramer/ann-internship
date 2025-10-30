import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const carouselOptions = {
  margin: 10,
  loop: true,
  responsiveClass: true,
  autoplay: false,
  nav: true,
  dots: false,
  smartSpeed: 500,
  responsive: {
    0: {
      items: 1,
    },
    575: {
      items: 2,
    },
    768: {
      items: 3,
    },
    992: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
};

const HotCollections = () => {
  const [hotCols, setHotCols] = useState([]);
  const [hotColsLoading, setHotColsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const abortController = new AbortController();

    const getHotCollections = async () => {
      try {
        setHotColsLoading(true);
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`, {
            signal: abortController.signal,
          }
        );
        //setHotCols(data);
      } catch (e) {
        if(axios.isCancel(e)) {
          console.log('Request canceled: ', e.message);
        } else {
          console.error("Error fetching HotCollections data: ", e);
          setError(e);
        }
        setHotCols([]);
      } finally {
        console.log("finally.")
        setTimeout(() => setHotColsLoading(false), 2000);
      }
    };

    getHotCollections();
    return() => {
      abortController.abort();
    };
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel className="owl-theme" {...carouselOptions} key={hotColsLoading}>
            {(hotCols.length === 0)
            ? new Array(4).fill(0).map((_, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Skeleton width = "100%" height = "170px" borderRadius = "0"></Skeleton>
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton width = "50px" height = "50px" borderRadius = "50%"></Skeleton>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Skeleton width = "100px" height = "20px" borderRadius = "0"></Skeleton>
                    <br />
                    <Skeleton width = "60px" height = "20px" borderRadius = "0"></Skeleton>
                  </div>
                </div>
              ))
            : hotCols.map(
              ({ id, title, authorImage, nftImage, nftId, code }) => (
                  <div className="nft_coll" key={id}>
                    <div className="nft_wrap">
                      <Link to={`/item-details/${nftId}`}>
                        <img
                          src={nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{title}</h4>
                      </Link>
                      <span>ERC-{code}</span>
                    </div>
                  </div>
              ))
            }
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;