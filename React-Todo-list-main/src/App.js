import "./App.css";
import { StatsigProvider } from "statsig-react";
import { TodoWrapper } from "./Components/TodoWrapper";
import { CLIENT_SDK_KEY } from "./Constant";
import { useState } from "react";
import { Login } from "./Components/Login";

/**
 * Entry point of application
 * and initializing the statsig sdk
 *
 * @returns
 */
function App() {
  /**
   * initialzing user
   */

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  console.log("User: ", user);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  /**
   * Setting the user and flag from the login details
   * @param {*} userName
   */
  const setUserDetails = (userName) => {
    let localUser = {
      userID: userName,
      email: "username@todoapp.com",
    };

    localStorage.setItem("user", JSON.stringify(localUser));
    localStorage.setItem("isLoggedIn", true);
    setUser(localUser);
    setIsLoggedIn(true);
  };

  /**
   * logging out from todo app
   */
  const onLogout = () => {
    localStorage.setItem("user", JSON.stringify({}));
    localStorage.setItem("isLoggedIn", false);
    setUser({});
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <StatsigProvider
        sdkKey={CLIENT_SDK_KEY}
        waitForInitialization={true}
        options={{
          environment: { tier: "staging" },
        }}
        user={user}
      >
        {!isLoggedIn ? (
          <Login setUser={setUserDetails} />
        ) : (
          <TodoWrapper onLogout={onLogout} />
        )}
      </StatsigProvider>
    </div>
  );
}

export default App;
