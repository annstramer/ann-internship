import React from 'react'
import { Link } from "react-router-dom";

const CategoryCard = ({ faIcon, animDelay }) => {
  return (
    <div className="col-md-2 col-sm-4 col-6 mb-sm-30" 
      data-aos="short-fade-left" 
      data-aos-duration="600" 
      data-aos-delay={animDelay}>
      <Link to="/explore" className="icon-box style-2 rounded">
        <i className={`fa ${faIcon}`}></i>
        <span>Art</span>
      </Link>
    </div>
  )
}

export default CategoryCard
