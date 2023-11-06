import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

const Router = createStackNavigator(
  {
    LoginScreen,
    HomeScreen,
  },
  {
    initialRouteName: "LoginScreen",
    headerMode: "none",
  }
);

export default createAppContainer(Router);
