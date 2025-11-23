import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { PrevArrow, NextArrow, NftItemCard, NftItemSkeleton } from "../UI";

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
                <NftItemSkeleton index={index} key={index}/>
              ))
            : newItems.map(
              (item) => (
                <NftItemCard card={item} key={item.id}/>
              ))
            }
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
