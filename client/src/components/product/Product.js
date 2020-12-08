import React from "react";
import {Card} from "react-bootstrap";
import {useHistory} from "react-router-dom";

import "./product.css";

const Product = props => {
  let history = useHistory();

  const onProductClicked = () => {
    history.push(`/details/${props.id}`);
  };

  const Promotion = () => {
    return (
      <>
        <Card.Img variant="top" src="https://sites.psu.edu/siowfa16/files/2016/10/YeDYzSR-10apkm4.png"/>
        <Card.Body>
          <Card.Text>
            <strong>{props.text}</strong>
          </Card.Text>
        </Card.Body>
      </>
    )
  };

  const Product = () => {
    return (
      <>
        {props.imageUrl &&
        <Card.Img variant="top" src={props.imageUrl} alt=""/>}

        {!props.imageUrl && props.videoUrl && <video controls>
          <source src={props.videoUrl}/>
          <p>Your browser doesn't support HTML5 video. Here is
            a <a href={props.videoUrl}>link to the video</a> instead.</p>
        </video>}

        <Card.Body onClick={e => onProductClicked(e)}>
          <Card.Text>
            <span>{props.order}</span>
            <span>{props.vendor}</span><br/>
            <strong>{props.name}</strong>
          </Card.Text>
        </Card.Body>
      </>
    )
  };

  return (
    <>
      <Card>
        {props.text && <Promotion/>}
        {!props.text && <Product/>}
      </Card>
    </>
  )
};

export default Product;