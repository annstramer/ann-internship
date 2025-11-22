import React from 'react'
import { Skeleton } from "../UI";

const NftItemSkeleton = (index) => {
  return (
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
  )
}

export default NftItemSkeleton
