import React from 'react'
import { Skeleton } from "../UI";

const AuthorSkeleton = () => {
  return (
    <div className="d_profile de-flex">
      <div className="de-flex-col">
        <div className="profile_avatar">
          <Skeleton width = "150px" height = "150px" borderRadius = "50%"></Skeleton>
          <i className="fa fa-check"></i>
          <div className="profile_name">
            <h4>
              <Skeleton width = "70px" height = "30px" borderRadius = "0"></Skeleton>
              <span className="profile_username"><Skeleton width = "50px" height = "30px" borderRadius = "0"></Skeleton></span>
              <span id="wallet" className="profile_wallet">
                <Skeleton width = "200px" height = "30px" borderRadius = "0"></Skeleton>
              </span>
            </h4>
          </div>
        </div>
      </div>
      <div className="profile_follow de-flex">
        <div className="de-flex-col">
          <div className="profile_follower"><Skeleton width = "100px" height = "30px" borderRadius = "0"></Skeleton></div>
          <Skeleton width = "124px" height = "42px" borderRadius = "6px"></Skeleton>
        </div>
      </div>
    </div>
  )
}

export default AuthorSkeleton
