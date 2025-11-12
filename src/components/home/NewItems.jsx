import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { CountDown, PrevArrow, NextArrow, Skeleton } from "../UI";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(true);
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

    const getNewItems = async () => {
      try {
        setNewItemsLoading(true);
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`, {
            signal: abortController.signal,
          }
        );
        setNewItems(data);
      } catch (e) {
        if(axios.isCancel(e)) {
          console.log('Request canceled: ', e.message);
        } else {
          console.error("Error fetching New Items data: ", e);
          setError(e);
        }
        setNewItems([]);
      } finally {
        setTimeout(() => setNewItemsLoading(false), 2000);
      }
    };
    
    getNewItems();
    handlePageSize();
    window.addEventListener("resize", handlePageSize);
    return() => {
      abortController.abort();
      window.removeEventListener("resize", handlePageSize);
    };
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider className="owl-theme" {...slickCarouselOptions} key={newItemsLoading}>
            {(newItems.length === 0)
            ? new Array(4).fill(0).map((_, index) => (
                <div className="nft__item" key={index}>
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
              ))
            : newItems.map(
              ({ authorId, authorImage, expiryDate, id, likes, nftId, nftImage, price, title }) => (
                <div className="nft__item" key={id}>
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
                    >
                      <img className="lazy" src={authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  {expiryDate ? <CountDown expires={expiryDate} key={newItemsLoading}/> : null }
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
                      <img
                        src={nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${nftId}`}><h4>{title}</h4></Link>
                    <div className="nft__item_price">{price} ETH</div>
                    <div className="nft__item_like"><i className="fa fa-heart"></i><span>{likes}</span>
                    </div>
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

export default NewItems;
