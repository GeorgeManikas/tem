import React, { useEffect, useState, useContext } from "react";
import { Autocomplete } from "@material-ui/lab";
import { SwitchContext } from "../../context/SwitchContext";
import { useSelect } from "downshift";
import {
  SET_CURRENT_PRODUCT,
  SET_CURRENT_FAMILY,
  REFRESH_PRODUCT_LIST,
} from "../../context/types";
import { MenuItem, TextField } from "@material-ui/core";

const MyAutoComplete = () => {
  const { state, dispatch } = useContext(SwitchContext);

  return (
    <>
      <Autocomplete
        options={state.products}
        getOptionLabel={(option) => option.code + " " + option.description}
        getOptionSelected={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
        renderOption={(option, value) => {
          return (
            <div
              key={option.id}
              style={{ color: value.selected ? "red" : "" }}
              onClick={() => {
                dispatch({
                  type: SET_CURRENT_FAMILY,
                  payload: option.product_family,
                });
                dispatch({ type: SET_CURRENT_PRODUCT, payload: option });
              }}
            >
              {option.description}{" "}
            </div>
          );
        }}
      />
      <pre> {JSON.stringify(state.currentProduct, null, 4)} </pre>
    </>
  );
};

export default MyAutoComplete;
