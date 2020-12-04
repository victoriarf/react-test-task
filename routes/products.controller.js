const data = require('../data.json');
const cache = require('memory-cache');

const ALL_VENDORS = 'All vendors';
const PRODUCTS_KEY = 'products';
const VENDORS_KEY = 'vendors';
const CACHE_TIME = 1000 * 60 * 5;

const cacheOrReturn = (key, getValueToCache, cacheTime = CACHE_TIME) => {
  const cashedValue = cache.get(key);

  if (cashedValue) {
    return {
      cache: true,
      value: cashedValue,
    };
  } else {
    const valueToCache = getValueToCache();
    cache.put([key], valueToCache, cacheTime);
    return {
      cache: false,
      value: valueToCache,
    };
  }
};

exports.getAll = (req, res) => {
  try {
    const {promotion, products} = data;
    const {search, vendor} = req.query;
    let productsArray;

    const getProductsBySearch = () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toString().toLowerCase())
      );

    const getProductsByVendor = () =>
      products.filter((product) => product.vendor === vendor);

    const getProductsByVendorAndSearch = () =>
      products.filter((product) => {
        const {vendor: productVendor, name} = product;

        return (
          productVendor === vendor &&
          name.toLowerCase().includes(search.toString().toLowerCase())
        );
      });

    if (search && vendor && vendor !== ALL_VENDORS) {
      productsArray = cacheOrReturn(
        `${search}${vendor}`,
        getProductsByVendorAndSearch
      );
      res.json({
        [PRODUCTS_KEY]: productsArray.value,
        cache: productsArray.cache,
      });
      return;
    }

    if (vendor && vendor !== ALL_VENDORS) {
      productsArray = cacheOrReturn(vendor, getProductsByVendor);
      res.json({
        [PRODUCTS_KEY]: productsArray.value,
        cache: productsArray.cache,
      });
      return;
    }

    if (search) {
      productsArray = cacheOrReturn(search, getProductsBySearch);
      res.json({
        [PRODUCTS_KEY]: productsArray.value,
        cache: productsArray.cache,
      });
      return;
    }

    productsArray = products
      .concat(promotion)
      .sort((first, next) => first.order - next.order);
    res.json({[PRODUCTS_KEY]: productsArray});
  } catch (e) {
    res.status(500).json({
      message: `Something went wrong, try again, ... error: ${e.message}`
    });
  }
};

exports.getOne = (req, res) => {
  try {
    const product = data.products.find(
      (product) => product.id === req.params.id
    );

    if (!product) {
      res.status(404).json({message: `Product was not found`});
    }
    res.json(product);
  } catch (e) {
    res.status(500).json({
      message: `Something went wrong, try again, ... error: ${e.message}`
    });
  }
};

exports.getVendors = (req, res) => {
  try {
    const {vendors} = data;
    if (!vendors) {
      res.json.status(404).json({message: 'Nothing found'});
    }
    res.json({[VENDORS_KEY]: vendors});
  } catch (e) {
    res.status(500).json({
      message: `Something went wrong, try again, ... error: ${e.message}`
    });
  }
};
