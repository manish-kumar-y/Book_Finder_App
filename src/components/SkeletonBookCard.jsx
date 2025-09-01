import React from "react";
import "./SkeletonBookCard.css";

function SkeletonBookCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image shimmer"></div>
      <div className="skeleton-line shimmer"></div>
      <div className="skeleton-line short shimmer"></div>
      <div className="skeleton-line tiny shimmer"></div>
    </div>
  );
}

export default SkeletonBookCard;
