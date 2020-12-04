import React from "react";

import "./productInfo.css";

const ProductInfo = props => {
  return (
    <div className="product-info-bar">
      <h3> {props.name}</h3>
      <h6> by: {props.vendor}</h6>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores consectetur, dignissimos
        laboriosam
        nihil numquam odio, odit provident quae ratione tempora tenetur, ullam vitae. At dicta hic perferendis
        ut
        velit.
      </p>
    </div>
  )
};

export default ProductInfo;