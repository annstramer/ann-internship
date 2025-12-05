import React from "react";
import { CategoryCard } from "../UI";

const BrowseByCategory = () => {
  
  return (
    <section id="section-category" className="no-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Browse by category</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <CategoryCard faIcon="fa-image" animDelay="200"/>
          <CategoryCard faIcon="fa-music" animDelay="350"/>
          <CategoryCard faIcon="fa-search" animDelay="500"/>
          <CategoryCard faIcon="fa-globe" animDelay="650"/>
          <CategoryCard faIcon="fa-address-card" animDelay="800"/>
          <CategoryCard faIcon="fa-th" animDelay="950"/>
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
