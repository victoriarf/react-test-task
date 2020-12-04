import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom"
import {Carousel} from "react-bootstrap";

import ProductInfo from "../productInfo/ProductInfo";
import "./productDetails.css";

const ProductDetailsPage = () => {
  const productId = useParams().id;
  const history = useHistory();

  const [product, setProduct] = useState({
    name: '',
    id: '',
    vendor: '',
    media: []
  });

  useEffect(() => {
    try {
      fetch(`/api/products/product/${productId}`)
        .then(response => {
          if (response.status >= 300) {
            throw new Error(response.statusText);
          }
          return response;
        })
        .then(response => response.json())
        .then(json => setProduct(() => json))
        .catch(e => history.push('/404'))
    } catch (e) {
    }
  }, [productId, history]);

  return (
    <>
      <div className="product-details-section">
        <Carousel>
          {product.media && product.media.length > 0 && product.media.map(media => {
            return (
              <Carousel.Item key={media.id}>
                {media.type === 'image' && <img alt="" src={media.url}/>}
                {media.type === 'video' && <video controls>
                  <source src={media.url}/>
                  <p>Your browser doesn't support HTML5 video. Here is
                    a <a href={media.url}>link to the video</a> instead.</p>
                </video>}
              </Carousel.Item>
            )
          })}
        </Carousel>

        <ProductInfo name={product.name}
                     vendor={product.vendor}/>
      </div>
    </>
  )
};

export default ProductDetailsPage;