import React from 'react';
import { Link } from "react-router-dom";
import { CountDown } from "../UI";

const NftItemCard = ({ card, authorImage, authorId }) => {
  
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={card.authorId ? `/author/${card.authorId}` : `/author/${authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
        >
          {card.authorImage ? <img className="lazy" src={card.authorImage} alt="" /> : <img className="lazy" src={authorImage} alt="" />}
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {card.expiryDate ? <CountDown expires={card.expiryDate} /> : null }
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
        <Link to={`/item-details/${card.nftId}`}>
          <img src={card.nftImage} className="lazy nft__item_preview" alt="" />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${card.nftId}`}>
          <h4>{card.title}</h4>
        </Link>
        <div className="nft__item_price">{card.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{card.likes}</span>
        </div>
      </div>
    </div>
  )
}

export default NftItemCard
