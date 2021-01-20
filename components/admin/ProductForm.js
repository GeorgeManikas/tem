import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { SwitchContext } from "../../context/SwitchContext";
import { SET_CURRENT_FAMILY } from "../../context/types";
import { useConfirm } from "material-ui-confirm";
import { Create, Delete, Update } from "@material-ui/icons";
import { useRouter } from "next/router";

const ProductForm = ({ newProduct }) => {
  const router = useRouter();
  const confirm = useConfirm();
  const { state, dispatch } = useContext(SwitchContext);
  const [code, setCode] = useState(state.currentProduct.code);
  const [num_code, setNum_code] = useState(state.currentProduct.num_code);
  const [description, setDescription] = useState(
    state.currentProduct.description
  );
  const [price, setPrice] = useState(state.currentProduct.price);
  const [products, setProducts] = useState(state.products);
  const [suggestedProducts, setSuggestedProducts] = useState(
    state.suggestedProducts
  );
  const [openSnackBar, setOpenSnackBar] = useState(false); // message on complete

  useEffect(() => {
    setCode(state.currentProduct.code);
    setNum_code(state.currentProduct.num_code);
    setDescription(state.currentProduct.description);
    setPrice(state.currentProduct.price);
  }, [state.currentProduct]);

  // form submittion
  const handleSumbit = async (e) => {
    e.preventDefault();
    if (newProduct) {
      const response = await fetch(
        `api/pricelist/updateProduct?&code=${code}&description=${description}&price=${price}&num_code=${num_code}&family=${state.currentFamily}`,
        { method: "POST" }
      );
      setOpenSnackBar(true);
      router.push("/"); // CHANGE ON PRODUCTION
    } else {
      const response = await fetch(
        `api/pricelist/updateProduct?id=${state.currentProduct.id}&code=${code}&description=${description}&price=${price}&num_code=${num_code}`,
        { method: "PUT" }
      );
      setOpenSnackBar(true);
      router.push("/");
    }
  };

  // delete action
  const handleDelete = () => {
    confirm({
      description: "Are you sure you want to delete this item ? ",
    }).then(async () => {
      const response = await fetch(
        `api/pricelist/updateProduct?id=${state.currentProduct.id}`,
        {
          method: "DELETE",
        }
      );
      setOpenSnackBar(true);
      router.push("/"); // *TODO UPDATE ON PRODUCTION
    });
  };

  return (
    <>
      {/* <Card
        style={{ width: "80%", margin: "auto", marginTop: "3rem" }}
        elevation={5}
      >
        <CardHeader
          style={{ background: "orange", color: "white" }}
          title={state.currentProduct.description}
          subheader={state.currentProduct.code}
        />
        <CardContent>
          <form
            onSubmit={(e) => handleSumbit(e)}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "0.2em",
              margin: "1rem",
            }}
          >
            {newProduct && (
              <TextField
                select
                variant="outlined"
                style={{ marginBottom: "0.9rem" }}
                label="Product Family"
                value={state.currentFamily}
                onChange={(e) =>
                  dispatch({
                    type: SET_CURRENT_FAMILY,
                    payload: e.target.value,
                  })
                }
              >
                {state.families.map((f, i) => (
                  <MenuItem key={i} value={f.id}>
                    {f.description}{" "}
                  </MenuItem>
                ))}
              </TextField>
            )}
            <TextField
              style={{ marginBottom: "0.9rem" }}
              id="code"
              label="Product Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              variant={"outlined"}
            />
            <TextField
              style={{ marginBottom: "0.9rem" }}
              id="num_code"
              label="Product numeric code"
              value={num_code}
              onChange={(e) => setNum_code(e.target.value)}
              variant={"outlined"}
            />
            <TextField
              style={{ marginBottom: "0.9rem" }}
              id="description"
              label="Product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant={"outlined"}
            />
            <TextField
              style={{ marginBottom: "0.9rem" }}
              id="price"
              type="number"
              label="Product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              variant={"outlined"}
            />
            <Button
              type="submit"
              startIcon={newProduct ? <Create /> : <Update />}
              variant="contained"
              color="secondary"
            >
              {newProduct ? "Create" : "Update"}
            </Button>
            {!newProduct && (
              <Button
                style={{
                  marginTop: "1.3rem",
                  background: "red",
                  color: "white",
                }}
                startIcon={<Delete style={{ color: "white" }} />}
                variant="contained"
                onClick={() => handleDelete()}
              >
                delete
              </Button>
            )}
          </form>
        </CardContent>
      </Card> */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnackBar}
        onClose={() => setOpenSnackBar(false)}
        message={"Successfully completed"}
        autoHideDuration={5000}
        style={{ background: "green" }}
      />
    </>
  );
};

export default ProductForm;
