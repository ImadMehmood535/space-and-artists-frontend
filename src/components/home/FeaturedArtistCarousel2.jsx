import React, { Fragment, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import ShowMoreText from "react-show-more-text";

const FeaturedArtistCarousel = ({ artists, responsive }) => {
  console.log("ARRRR", artists);
  return (
    <Fragment>
      <OwlCarousel
        className="owl-theme FloatCarousel DBlock owl-rtl"
        loop={false}
        responsive={responsive}
        margin={10}
        nav={false}
        dots={false}
        autoplay={true}
        autoplayTimeout={3000}
        smartSpeed={1000}
      >
        {artists &&
          artists.map((list, i) => (
            <div className="item" key={i}>
              <Link
                to={`/artist-profile/${list.id}`}
                className="ArtistDiv DBlock position-relative"
              >
                <div className="Art">
                  <p className="mb-0">
                    {list.categoryName !== null ? (
                      <ShowMoreText
                        lines={1}
                        width={130}
                        more=""
                        less=""
                        className="content-css"
                        anchorClass="my-anchor-css-class"
                        expanded={false}
                      >
                        {list.categoryName}
                      </ShowMoreText>
                    ) : (
                      "Guest User"
                    )}
                  </p>
                </div>
                <div className="ArtistHeader DBlock">
                  <div className="ArtistImg DBlock">
                    {list.profilePicture ? (
                      <img src={list.profilePicture} alt="" className="" />
                    ) : (
                      <Avatar
                        name={`${list.firstName} ${list.lastName}`}
                        size="100%"
                      />
                    )}
                  </div>
                </div>
                <div className="ArtistFooter DBlock">
                  <p className="mb-0">{list.firstName}</p>
                </div>
              </Link>
            </div>
          ))}
      </OwlCarousel>
    </Fragment>
  );
};

export default FeaturedArtistCarousel;
