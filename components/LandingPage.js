import React, { useState, useEffect, useContext } from "react";
import { SwitchContext } from "../context/SwitchContext";
import Button from "@material-ui/core/Button";
import MyAutoComplete from "./admin/MyAutoComplete";
import ProductForm from "./admin/ProductForm";
import {
  FETCH_PRODUCTS,
  FETCH_FAMILIES,
  SET_CURRENT_FAMILY,
  SET_CURRENT_PRODUCT,
  SET_SUGGESTED_PRODUCT,
} from "../context/types";

const LandingPage = ({ products, families }) => {
  const { state, dispatch } = useContext(SwitchContext);
  useEffect(() => {
    dispatch({ type: FETCH_PRODUCTS, payload: products });
    dispatch({ type: FETCH_FAMILIES, payload: families });
    dispatch({ type: SET_CURRENT_PRODUCT, payload: products[0] });
    dispatch({ type: SET_CURRENT_FAMILY, payload: families[0].id });
    dispatch({ type: SET_SUGGESTED_PRODUCT, payload: products });
  }, []);

  const [newProduct, setNewProduct] = useState(false);

  return (
    <>
      <MyAutoComplete />
      <ProductForm newProduct={newProduct} />
    </>
  );
};

export default LandingPage;
