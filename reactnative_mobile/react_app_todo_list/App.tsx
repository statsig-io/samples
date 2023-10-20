import { StyleSheet, View, Keyboard, Text, AppState } from "react-native";
import { StatsigProvider, Statsig } from "statsig-react";
import { REACT_APP_CLIENT_KEY } from "@env";
import { useEffect, useState, Component, useRef } from "react";
import "react-native-get-random-values";
import KeyboardAvoidingTextInput from "./components/KeyboardAvoidingTextInput";
import TodoList from "./components/TodoList";

export default function App() {
  const [task, setTask] = useState<any>("");
  const [taskItems, setTaskItems] = useState<string[]>([]);
  const [user, setUser] = useState({ userID: "reactnative_dummy_user_id" });
  const API_KEY: string = REACT_APP_CLIENT_KEY || "";
  const [statsigInitialized, setStatsigInitialized] = useState(false);
  const TODO_CREATED: string = "todo_created";
  const APP_OPENED: string = "app_opened";
  const APP_BACKGROUNDED: string = "app_backgrounded";

  const appState = useRef(AppState.currentState);

  const handleAppStateChange = (nextAppState: any) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      Statsig.logEvent(APP_OPENED);
    } else {
      Statsig.logEvent(APP_BACKGROUNDED);
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, []);

  const handleAddTask = async (text: string) => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
    Statsig.logEvent(TODO_CREATED);
  };

  const completeTask = (index: any) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const initCallback = (
    initDurationMs: number,
    success: boolean,
    message: string | null
  ) => {
    setStatsigInitialized(success);
  };

  return (
    <View style={styles.container}>
      <StatsigProvider
        sdkKey={API_KEY}
        user={user}
        waitForInitialization={true}
        options={{
          initCompletionCallback: initCallback,
        }}
      >
        <View />
      </StatsigProvider>
      {statsigInitialized ? (
        <View style={styles.childContainer}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>

          <KeyboardAvoidingTextInput
            placeHolderText={"Write a task here"}
            changeText={(text: String) => setTask(text)}
            taskValue={task}
            addTask={(text: string) => handleAddTask(text)}
          />

          <TodoList
            dataList={taskItems}
            deleteTodoFromList={(index: any, item: any) => completeTask(index)}
          />
        </View>
      ) : (
        <View style={styles.childContainer}>
          <Text style={styles.errorSectionTitle}>
            Statsig SDK not initialized. Please try reopening the application.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  childContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  sectionTitle: {
    fontSize: 24,
    marginTop: 60,
    marginLeft: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  errorSectionTitle: {
    fontSize: 20,
    marginTop: 60,
    marginLeft: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
