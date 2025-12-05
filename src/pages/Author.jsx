import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { NftItemSkeleton, AuthorSkeleton } from "../components/UI";

const Author = () => {
  const {authorId} = useParams();
  const [authorNFTItems, setAuthorNFTItems] = useState([]);
  const [authorItemsLoading, setAuthorItemsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    if (isFollowing) {
      setIsFollowing(false);
    } else {
      setIsFollowing(true);
    }
  };
  
  useEffect(() => {
    const abortController = new AbortController();
  
    const getAuthorItems = async () => {
      try {
        setAuthorItemsLoading(true);
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`, {
            signal: abortController.signal,
          }
        );
        setAuthorNFTItems(data);
      } catch (e) {
        if(axios.isCancel(e)) {
          console.log('Request canceled: ', e.message);
        } else {
          console.error("Error fetching New Items data: ", e);
          setError(e);
        }
        setAuthorNFTItems([]);
      } finally {
        setTimeout(() => setAuthorItemsLoading(false), 2000);
      }
    };
    
    getAuthorItems();
    window.scrollTo({
      top: 0, left: 0, behavior: 'smooth'
    });
    return() => {
      abortController.abort();
    };
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {(authorItemsLoading)
                  ? <AuthorSkeleton />
                  : <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar"
                          data-aos="fade-in" 
                          data-aos-duration="500" 
                          data-aos-delay="800">
                          <img src={authorNFTItems.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {authorNFTItems.authorName}
                              <span className="profile_username">@{authorNFTItems.tag}</span>
                              <span id="wallet" className="profile_wallet">
                                {authorNFTItems.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">{isFollowing? authorNFTItems.followers + 1 : authorNFTItems.followers} followers</div>
                          <Link to="#" className="btn-main"
                            onClick={() => handleFollowClick()}>
                            {isFollowing? "Unfollow" : "Follow"}
                          </Link>
                        </div>
                      </div>
                    </div>
                }
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <div className="de_tab_content">
                    <div className="tab-1">
                      <div className="row">
                          {(authorItemsLoading)
                            ? new Array(8).fill(0).map((_, index) => (
                              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                                <NftItemSkeleton key={index} />
                              </div>
                            ))
                            : <AuthorItems nftItems={authorNFTItems.nftCollection} authorImage={authorNFTItems.authorImage} authorId={authorId}/>
                          }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
