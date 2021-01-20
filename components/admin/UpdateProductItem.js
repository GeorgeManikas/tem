import React, { useState, useEffect, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useRouter } from "next/router";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Snackbar,
} from "@material-ui/core";
import { useConfirm } from "material-ui-confirm";
import { Check, Delete, Update } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {},
  header: {
    background: theme.palette.primary.light,
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  fields: {
    marginBottom: theme.spacing(2.4),
  },
}));

const UpdateProductItem = ({ item }) => {
  const router = useRouter();
  const confirm = useConfirm();
  const { code, description, price, num_code, id } = item;
  const classes = useStyles();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [producId, setProductId] = useState(0);
  const [itemCode, setCode] = useState("");
  const [itemNumCode, setItemNumCode] = useState("");
  const [itemPrice, setPrice] = useState(0);
  const [itemDescription, setDescription] = useState("");
  const [productFamilies, setProductFamilies] = useState([]);
  const [currentFamily, setCurrentFamily] = useState(1);
  const itemString = price.toString();

  useEffect(() => {
    setProductId(id);
    setCode(code);
    setDescription(description);
    setPrice(price);
    setItemNumCode(num_code);

    const fetchFamilies = async () => {
      const res = await fetch("/api/pricelist/getProductFamilies");
      const families = await res.json();
      setProductFamilies(families);
    };
    fetchFamilies();
  }, []);

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (id === 0) {
      const response = await fetch(
        `api/pricelist/updateProduct?id=${id}&code=${itemCode}&description=${itemDescription}&price=${itemPrice}&num_code=${itemNumCode}&family=${currentFamily}`,
        { method: "POST" }
      );
      setOpenSnackBar(true);
      router.push("/admin");
    } else {
      const response = await fetch(
        `api/pricelist/updateProduct?id=${id}&code=${itemCode}&description=${itemDescription}&price=${itemPrice}&num_code=${itemNumCode}`,
        { method: "PUT" }
      );
      setOpenSnackBar(true);
    }
  };

  const handleDelete = () => {
    confirm({
      description: "Are you sure you want to delete this item ? ",
    }).then(async () => {
      const response = await fetch(`api/pricelist/updateProduct?id=${id}`, {
        method: "DELETE",
      });
      setOpenSnackBar(true);
    });
  };

  return (
    <>
      <Card square style={{ width: "50%", margin: "auto" }}>
        <CardHeader
          title={id !== 0 ? code : " Add new Product "}
          subheader={description}
          className={classes.header}
        ></CardHeader>

        <CardContent>
          {/* <pre>{JSON.stringify(item, null, 4)} </pre> */}
          <form
            id="update_form"
            className={classes.form}
            onSubmit={(e) => handleSumbit(e)}
          >
            {id === 0 && (
              <>
                <InputLabel htmlFor="product_family">
                  {" "}
                  Product family{" "}
                </InputLabel>
                <Select
                  id="product_family"
                  className={classes.fields}
                  variant="outlined"
                  color="primary"
                  placeholder={"Pick Family of the product "}
                  defaultValue={""}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setCurrentFamily(e.target.value);
                  }}
                >
                  {productFamilies.map((f) => (
                    <MenuItem
                      key={f.id}
                      value={f.id}
                      // onChange={(e) => setCurrentFamily(f.id)}
                    >
                      {" "}
                      {f.description}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
            <InputLabel htmlFor="code"> Product code </InputLabel>
            <TextField
              id="code"
              className={classes.fields}
              variant="outlined"
              color="primary"
              placeholder={code}
              value={itemCode}
              onChange={(e) => setCode(e.target.value)}
            />
            <InputLabel htmlFor="num_code"> Numeric code </InputLabel>
            <TextField
              id="num_code"
              className={classes.fields}
              variant="outlined"
              color="primary"
              placeholder={num_code}
              value={itemNumCode}
              onChange={(e) => setItemNumCode(e.target.value)}
            />
            <InputLabel htmlFor="description"> decription </InputLabel>
            <TextField
              id="description"
              className={classes.fields}
              variant="outlined"
              color="primary"
              placeholder={description}
              value={itemDescription}
              onChange={(e) => setDescription(e.target.value)}
            />
            <InputLabel htmlFor="price"> Product price </InputLabel>
            <TextField
              id="price"
              type="number"
              className={classes.fields}
              variant="outlined"
              color="primary"
              placeholder={itemString}
              value={itemPrice}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {id === 0 ? (
                    <>
                      <Check /> <span> Create </span>{" "}
                    </>
                  ) : (
                    <>
                      <Update /> <span> Update </span>{" "}
                    </>
                  )}
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={() => handleDelete()}
                >
                  <Delete /> <span> Delete </span>
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
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

export default UpdateProductItem;
