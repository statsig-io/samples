import "./App.css";
import { StatsigProvider } from "statsig-react";
import { TodoWrapper } from "./Components/TodoWrapper";
import { CLIENT_SDK_KEY } from "./Constant";

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
  const user = {
    userID: "user-us",
    email: "upendra.singh@ltts.com",
  };
  console.log("User: ", user);

  return (
    <StatsigProvider
      sdkKey={CLIENT_SDK_KEY}
      waitForInitialization={true}
      options={{
        environment: { tier: "staging" },
      }}
      user={user}
    >
      <div className="App">
        <TodoWrapper />
      </div>
    </StatsigProvider>
  );
}

export default App;
