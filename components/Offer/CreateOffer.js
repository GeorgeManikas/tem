import React, { useState, useEffect, useContext } from "react";
import { SwitchContext } from "../../context/SwitchContext";
import { SET_CURRENT_OFFER } from "../../context/types";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Create } from "@material-ui/icons";
import AddOfferItems from "./AddOfferItems";
const useStyles = makeStyles((theme) => ({
  paper: {
    width: "50%",
    margin: "auto",
    marginTop: "4rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    top: "50%",
    width: "60%",
    margin: "auto",
    padding: "2rem",
  },
  btn: {
    marginTop: "2rem",
  },
}));

const CreateOffer = () => {
  const classes = useStyles();
  const [descriptionCreated, setDescriptionCreated] = useState(false);
  const [description, setDescription] = useState("");
  const { state, dispatch } = useContext(SwitchContext);

  const createDescription = async (e) => {
    if (description !== "") {
      e.preventDefault();
      const offer_response = await fetch(
        `/api/offer/newOffer?description=${description}`,
        { method: "POST" }
      );
      const offer = await offer_response.json();
      dispatch({ type: SET_CURRENT_OFFER, payload: offer });
      setDescriptionCreated(true);
    } else {
      return;
    }
  };

  return (
    <>
      {descriptionCreated ? (
        <AddOfferItems />
      ) : (
        <Paper elevation={5} className={classes.paper}>
          <form onSubmit={(e) => createDescription(e)} className={classes.form}>
            <TextField
              className={classes.field}
              id="offer"
              label="Offer Description"
              value={description}
              placeholder="Set offer a descriptive name"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              className={classes.btn}
              variant="contained"
              color="secondary"
              type="submit"
              endIcon={<Create style={{ color: "white" }} />}
            >
              Create offer
            </Button>
          </form>
        </Paper>
      )}
    </>
  );
};

export default CreateOffer;
