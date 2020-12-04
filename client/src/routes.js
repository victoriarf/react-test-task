import React from "react";
import {Switch, Route, Redirect} from "react-router-dom"
import ProductsListPage from "./components/productsList/ProductsList";
import ProductDetailsPage from "./components/productDetails/ProductDetails";
import Page404 from "./components/404-page";

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/details/:id">
        <ProductDetailsPage/>
      </Route>
      <Route path="/" exact>
        <ProductsListPage/>
      </Route>
      <Route path="/404" exact>
        <Page404/>
      </Route>
      <Redirect to="/">
        <ProductsListPage/>
      </Redirect>
    </Switch>
  )
};