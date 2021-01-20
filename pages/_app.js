import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../styles/theme";
import Appbar from "../components/layout/Appbar";
import { ConfirmProvider } from "material-ui-confirm";
import SwitchState from "../context/SwitchState";
import { SwitchContext } from "../context/SwitchContext";
import { ContextDevTool } from "react-context-devtool";
export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Tem Create </title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <SwitchState>
          <ContextDevTool
            context={SwitchContext}
            id="SwitchContext"
            displayName="Switches Context"
          />
          <ConfirmProvider>
            <CssBaseline />
            <Appbar />
            <Component {...pageProps} />
          </ConfirmProvider>
        </SwitchState>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
