import { Provider } from "react-native-paper";
import { theme } from "./src/core/themes";
import App from "./src";

export default function Main() {
  return (
    <Provider theme={theme}>
      <App />
    </Provider>
  );
}
