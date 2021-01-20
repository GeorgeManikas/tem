import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

const Appbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href="/" passHref>
          <a style={{ textDecoration: "none" }}>
            <Typography variant="h6" color="textPrimary">
              TEM Products{" "}
            </Typography>
          </a>
        </Link>

        <Link href="/offer/new" passHref style={{ textDecoration: "none" }}>
          <a style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              color="textPrimary"
              style={{ flexGrow: 1 }}
            >
              {" "}
              New Offer{" "}
            </Typography>
          </a>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
