import React from 'react';
import {Form} from 'react-bootstrap';

export const ProductSearch = (props) => {
  const {handleProductSearch} = props;

  return (
    <>
      <Form.Group controlId="productSearch">
        <Form.Control
          type="text"
          placeholder="Search products"
          onChange={(e) => handleProductSearch(e.target.value)}
        />
      </Form.Group>
    </>
  );
};
