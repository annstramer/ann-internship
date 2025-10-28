import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [hotCols, setHotCols] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const carouselOptions = {
    margin: 10,
    loop: true,
    responsiveClass: true,
    autoplay: false,
    nav: true,
    navContainer: "#owl-cust-nav",
    smartSpeed: 500,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };
  
  
  useEffect(() => {
    const getHotCollections = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
        );
        console.log("returned from await", response.data);
        setHotCols(response.data);
      } catch (e) {
        console.log("Error fetching HotCollections data: ", e);
        setHotCols([]); // Clear HotCollections on error
      } finally {
        setIsLoading(false);
      }
    };

    getHotCollections();
  }, []);

  if (isLoading) {
    return (
      <div className="owl-carousel owl-theme owl-loaded owl-drag">
        <div className="owl-stage-outer">
          <div className="owl-stage">
            <OwlCarousel className="owl-theme" {...carouselOptions}>                    
                {(new Array(4).fill(0).map((_, i) => (
                  <div className="nft_coll" key="i">
                    <div className="nft_wrap">
                      <a href="/">
                        <div className="skeleton-box" style={{width: '100%', height: '130px'}}></div>
                      </a>
                    </div>
                    <div className="nft_coll_pp">
                      <a href="/">
                        <div className="skeleton-box" style={{width: '50px', height: '50px',borderRadius: '50%', }}></div>
                      </a>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <a href="/">
                        <div className="skeleton-box" style={{width: '100px', height: '20px'}}></div>
                      </a>
                      <br />
                      <a href="/">
                        <div className="skeleton-box" style={{width: '60px', height: '20px'}}></div>
                      </a>
                    </div>
                  </div>
                )))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    )
  }

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
          <div className="owl-carousel owl-theme owl-loaded owl-drag">
            <div className="owl-stage-outer">
              <div className="owl-stage">
                <OwlCarousel className="owl-theme" {...carouselOptions}>
                  {hotCols &&
                    (hotCols.map(({ id, title, authorImage, nftImage, nftId, code }) => (
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
                      )))
                    }
                </OwlCarousel>
              </div>
            </div>
            <div className="owl-nav" id="owl-cust-nav">
              <button type="button" role="presentation" className="owl-prev">
                <span aria-label="Previous">‹</span>
              </button>
              <button type="button" role="presentation" className="owl-next">
                <span aria-label="Next">›</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
