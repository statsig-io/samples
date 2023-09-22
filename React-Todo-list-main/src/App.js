import "./App.css";
import { StatsigProvider } from "statsig-react";
import { useState } from "react";
import { TodoWrapper } from "./Components/TodoWrapper";
import { SS_CLIENT_SDK_KEY } from "./Constant";

/** Pass your StatsigUser into the StatsigProviderreturn (   
   <StatsigProvider      sdkKey="client-key"   
      waitForInitialization={true}    
        user={user}    >**/

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
      sdkKey={SS_CLIENT_SDK_KEY}
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
