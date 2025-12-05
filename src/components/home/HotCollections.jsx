import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { PrevArrow, NextArrow, Skeleton } from "../UI";

const HotCollections = () => {
  const [hotCols, setHotCols] = useState([]);
  const [hotColsLoading, setHotColsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialSlides, setInitialSlides] = useState(4);
    
  const handlePageSize = () => {
    const width = window.innerWidth;
    if (width > 992) {
        setInitialSlides(4);
    } else if (width > 768) {
        setInitialSlides(3);
    } else if (width > 480) {
        setInitialSlides(2);
    } else {
        setInitialSlides(1);
    }
  };
    
  const slickCarouselOptions = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: initialSlides,
    initialSlide: 0,
    swipeToSlide: true,
    lazyLoad: 'ondemand',
    arrows: true,
    prevArrow: <PrevArrow cClass="owl-prev" />,
    nextArrow: <NextArrow cClass="owl-next" />,
  }
  
  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;
    let timeoutId = null;

    const getHotCollections = async () => {
      try {
        setHotColsLoading(true);
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`, {
            signal: abortController.signal,
          }
        );
        if (isMounted) {
          setHotCols(data);
        }
      } catch (e) {
        if(axios.isCancel(e)) {
          console.log('Request canceled: ', e.message);
        } else {
          console.error("Error fetching HotCollections data: ", e);
          if (isMounted) {
            setError(e);
          }
        }
        if (isMounted) {
          setHotCols([]);
        }
      } finally {
        timeoutId = setTimeout(() => {
          if (isMounted) {
            setHotColsLoading(false)
          }
        }, 2000);
      }
    };

    getHotCollections();
    handlePageSize();
    window.addEventListener("resize", handlePageSize);
    return() => {
      isMounted = false;
      abortController.abort();
      window.removeEventListener("resize", handlePageSize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
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
          <Slider className="owl-theme" {...slickCarouselOptions} key={hotColsLoading}>
            {(hotCols.length === 0)
            ? new Array(4).fill(0).map((_, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Skeleton width = "100%" height = "100%" borderRadius = "0"></Skeleton>
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
              ({ id, title, authorId, authorImage, nftImage, nftId, code }) => (
                  <div className="nft_coll" key={id} >
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
                      <Link to={`/author/${authorId}`}>
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
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;