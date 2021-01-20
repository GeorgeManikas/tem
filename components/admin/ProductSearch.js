import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import UpdateProductItem from "./UpdateProductItem";
import Button from "@material-ui/core/Button";
import { Add } from "@material-ui/icons";
const ProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [value, setValue] = useState("1");

  const dummyObject = {
    id: 0,
    code: "",
    num_code: "",
    description: "",
    price: 0,
  };
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/pricelist/getAllPrices");
      const data = await res.json();
      setValue(data[0].id);
      setProducts(data);
    };
    fetchProducts();
  }, [products]);

  return (
    <>
      <Autocomplete
        id="products"
        options={[value, ...products]}
        filterSelectedOptions
        getOptionLabel={(option) =>
          option.code ? option.code + " " + option.description : ""
        }
        getOptionSelected={(option, value) =>
          option.code + " " + option.description ===
          value.code + " " + value.description
        }
        value={value}
        onChange={(e, newValue) => {
          if (newValue) {
            setValue(newValue);
            setCurrentProduct(newValue);
          }
        }}
        autoComplete
        style={{ width: "400px" }}
        renderInput={(params) => (
          <TextField {...params} label="Product list" variant="outlined" />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCurrentProduct(dummyObject)}
      >
        <Add style={{ color: "white" }} />{" "}
        <span style={{ color: "white" }}> New Record </span>
      </Button>
      {currentProduct && <UpdateProductItem item={currentProduct} />}
    </>
  );
};

export default ProductSearch;
