import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import NftDetailsSkeleton from "../components/UI/NftDetailsSkeleton";

const ItemDetails = () => {
  const {nftId} = useParams();
  const [nftDetails, setNftDetails] = useState([]);
  const [nftDetailsLoading, setNftDetailsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const abortController = new AbortController();
  
    const getNftDetails = async () => {
      try {
        setNftDetailsLoading(true);
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`, {
            signal: abortController.signal,
          }
        );
        setNftDetails(data);
      } catch (e) {
        if(axios.isCancel(e)) {
          console.log('Request canceled: ', e.message);
        } else {
          console.error("Error fetching NFT Details data: ", e);
          setError(e);
        }
        setNftDetails([]);
      } finally {
        setTimeout(() => setNftDetailsLoading(false), 2000);
      }
    };
    
    getNftDetails();
    window.scrollTo(0, 0);
    return() => {
      abortController.abort();
    };
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {(nftDetailsLoading)
               ? <NftDetailsSkeleton />
               : <>
                  <div className="col-md-6 text-center" key={nftDetails.id}>
                    <img
                      src={nftDetails.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{nftDetails.title} #{nftDetails.tag}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {nftDetails.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {nftDetails.likes}
                        </div>
                      </div>
                      <p>
                        {nftDetails.description}
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nftDetails.ownerId}`}>
                                <img className="lazy" src={nftDetails.ownerImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nftDetails.ownerId}`}>{nftDetails.ownerName}</Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nftDetails.creatorId}`}>
                                <img className="lazy" src={nftDetails.creatorImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nftDetails.creatorId}`}>{nftDetails.creatorName}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{nftDetails.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
