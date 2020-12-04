import React, {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';

import Product from '../product/Product';
import {ProductSearch} from '../productSearch/ProductSearch';
import {VendorSelect} from '../vendorSelect/VendorSelect';
import './productsList.css';

function ProductsListPage() {
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [vendorSearch, setVendorSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');

  useEffect(() => {
    fetch('/api/products/all')
      .then((response) => response.json())
      .then((json) => setProducts(() => json.products));
  }, []);

  useEffect(() => {
    fetch('/api/products/vendors')
      .then((response) => response.json())
      .then((json) => setVendors(() => json.vendors));
  }, []);

  useEffect(() => {
    const url = `/api/products/all?${
      vendorSearch ? `vendor=${vendorSearch}&` : ''
    }${productSearch ? `search=${productSearch}&` : ''}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setProducts(() => json.products));
  }, [vendorSearch, productSearch]);

  const getMediaUrl = (media, mediaType) => {
    return media.find((media) => media.type === mediaType).url;
  };

  return (
    <div className="productsListPage">
      <Row className="productsListControls">
        <Col xs={12} sm={5} md={5} lg={3}>
          <ProductSearch
            handleProductSearch={(search) => setProductSearch(search)}
          />
        </Col>
        <Col xs={12} sm={5} md={5} lg={3}>
          <VendorSelect
            vendors={vendors}
            handleVendorChange={(selectedVendor) =>
              setVendorSearch(selectedVendor)
            }
          />
        </Col>
      </Row>

      <div className="productsList">
        {products.map((product, index) => {
          return (
            <Product
              key={index}
              imageUrl={
                product.media ? getMediaUrl(product.media, 'image') : ''
              }
              videoUrl={
                product.media ? getMediaUrl(product.media, 'video') : ''
              }
              vendor={product.vendor}
              name={product.name}
              id={product.id}
              text={product.text}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProductsListPage;
