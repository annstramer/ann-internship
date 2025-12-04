import React from 'react'
import { Skeleton } from "../UI";

const NftDetailsSkeleton = () => {
  return (
    <>
      <div className="col-md-6 text-center">
        <Skeleton width="100%" height="100%" borderRadius="0" />
      </div>
      <div className="col-md-6">
        <div className="item_info">
          <h2><Skeleton width="65%" height="30px" borderRadius="0" /></h2>

          <div className="item_info_counts">
              <Skeleton width="80px" height="30px" borderRadius="0" />
              <Skeleton width="80px" height="30px" borderRadius="0" />
          </div>
          <Skeleton width="100%" height="100px" borderRadius="0" />
          <div className="d-flex flex-row">
            <div className="mr40">
              <h6>Owner</h6>
              <div className="item_author">
                <div className="author_list_pp">
                  <Skeleton width = "50px" height = "50px" borderRadius = "50%"></Skeleton>
                  <i className="fa fa-check"></i>
                </div>
                <div className="author_list_info">
                  <Skeleton width="100px" height="30px" borderRadius="0" />
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
                  <Skeleton width = "50px" height = "50px" borderRadius = "50%"></Skeleton>
                  <i className="fa fa-check"></i>
                </div>
                <div className="author_list_info">
                  <Skeleton width="100px" height="30px" borderRadius="0" />
                </div>
              </div>
            </div>
            <div className="spacer-40"></div>
            <h6>Price</h6>
            <div className="nft-item-price">
              <Skeleton width="150px" height="35px" borderRadius="0" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NftDetailsSkeleton
