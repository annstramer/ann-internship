import React from "react";
import { NftItemCard } from "../UI";

const AuthorItems = ({nftItems, authorImage}) => {

  return (
    <>
      {nftItems.map(
        (item) => (
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
            <NftItemCard card={item} authorImage={authorImage}/>
          </div>
        ))
      }
    </>
  );
};

export default AuthorItems;
