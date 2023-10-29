import React from "react";
import App from "./src";
import { theme } from "./src/core/themes";
import { Provider } from "react-native-paper";

export default function Main() {
  return (
    <Provider theme={theme}>
      <App />
    </Provider>
  );
}
