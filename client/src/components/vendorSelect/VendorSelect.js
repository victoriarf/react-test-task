import React from 'react';
import {Form} from 'react-bootstrap';

export const VendorSelect = (props) => {
  const {handleVendorChange} = props;

  return (
    <>
      <Form.Group controlId="productSearch">
        <Form.Control
          as="select"
          onChange={(e) => handleVendorChange(e.target.value)}>
          <option>All vendors</option>
          {props.vendors.map((vendor, index) => (
            <option key={index}>{vendor}</option>
          ))}
        </Form.Control>
      </Form.Group>
    </>
  );
};
