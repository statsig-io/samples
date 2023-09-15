import "./App.css";
import { StatsigProvider } from "statsig-react";
import { useState } from "react";
import { TodoWrapper } from "./Components/TodoWrapper";

const SS_CLIENT_SDK_KEY = "client-wWQtJlfJfEnLSIuP6QcnTATHyGVHUnJ2URTGLOVrwrl";

/** Pass your StatsigUser into the StatsigProviderreturn (   
   <StatsigProvider      sdkKey="client-key"   
      waitForInitialization={true}    
        user={user}    >**/

function App() {

  const [user, setUser] = useState({  userID: "user-us",  email: "upendra.singh@ltts.com"});
  console.log("User: ", user)
  const [deleteFeatureFlag, setDeleteFeatureFlag] = useState(false);

  return (
    <StatsigProvider
    sdkKey={SS_CLIENT_SDK_KEY}
    waitForInitialization={true}
    options={{
      environment: { tier: "staging" },
    }}
  >
    <div className="App">
      <TodoWrapper />
    </div>
    </StatsigProvider>
  );
}

export default App;
