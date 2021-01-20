import { Grid, Paper, TextField, Fab } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { SwitchContext } from "../../context/SwitchContext";
import { makeStyles } from "@material-ui/styles";
import MyAutoComplete from "../admin/MyAutoComplete";
import { Add } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  paper: {
    width: "80%",
    margin: "auto",
    marginTop: "4rem",
    padding: "3rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    top: "50%",
    width: "80%",
    margin: "auto",
    padding: "2rem",
  },
  btn: {
    marginTop: "2rem",
  },
}));

const AddOfferItems = () => {
  const { state, dispatch } = useContext(SwitchContext);
  const [qty, setQuantity] = useState(0);
  const classes = useStyles();
  return (
    <Paper elevation={5} className={classes.paper}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <MyAutoComplete />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              id="qty"
              label="Quantity"
              value={qty}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="quantity"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Fab color="primary" aria-label="Add">
              <Add />
            </Fab>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddOfferItems;
